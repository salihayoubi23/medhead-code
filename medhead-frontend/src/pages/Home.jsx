import { useEffect, useMemo, useState } from "react";
import {
  fetchOriginZones,
  fetchSpecialities,
  recommendHospital,
  reserveBed,
  getToken,
} from "../services/api";

import Header from "../components/Header";
import AlertBox from "../components/AlertBox";
import RecommendationForm from "../components/RecommendationForm";
import RecommendationResult from "../components/RecommendationResult";
import Login from "../components/Login";

export default function Home() {
  // ✅ on considère connecté si un token existe
  const [isAuthed, setIsAuthed] = useState(!!getToken());

  const [specialities, setSpecialities] = useState([]);
  const [zones, setZones] = useState([]);

  const [selectedSpeciality, setSelectedSpeciality] = useState("");
  const [selectedZone, setSelectedZone] = useState("");

  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState(null);
  const [alert, setAlert] = useState(null); // { type, message }

  useEffect(() => {
    // 🔒 si pas connecté, on ne charge pas les données
    if (!isAuthed) return;

    let cancelled = false;

    async function init() {
      try {
        const [specs, z] = await Promise.all([
          fetchSpecialities(),
          fetchOriginZones(),
        ]);

        if (cancelled) return;

        const normalizedSpecs = (specs || [])
          .map((s) => (typeof s === "string" ? s : s?.name))
          .filter(Boolean);

        setSpecialities(normalizedSpecs);
        setZones(z || []);

        setSelectedSpeciality(normalizedSpecs[0] || "");
        setSelectedZone(z?.[0]?.value || "");
      } catch (e) {
        if (cancelled) return;
        setAlert({ type: "danger", message: e.message || "Erreur au chargement." });
      }
    }

    init();
    return () => {
      cancelled = true;
    };
  }, [isAuthed]);

  const selectedZoneLabel = useMemo(() => {
    return zones.find((x) => x.value === selectedZone)?.label || selectedZone || "—";
  }, [zones, selectedZone]);

  async function onRecommend(e) {
    e.preventDefault();
    if (!selectedSpeciality || !selectedZone) return;

    setLoading(true);
    setAlert(null);

    try {
      const data = await recommendHospital({
        speciality: selectedSpeciality,
        originZone: selectedZone,
      });

      setResult(data);

      if (!data?.hospitalName) {
        setAlert({ type: "info", message: data?.reason || "Aucun hôpital recommandé." });
      } else {
        setAlert({ type: "success", message: "Recommandation obtenue." });
      }
    } catch (e2) {
      setResult(null);
      setAlert({ type: "danger", message: e2.message || "Erreur recommandation." });
    } finally {
      setLoading(false);
    }
  }

  async function onReserve() {
    if (!result?.hospitalId) return;

    setLoading(true);
    setAlert(null);

    try {
      const r = await reserveBed(result.hospitalId);

      setResult((prev) => ({
        ...prev,
        availableBeds: r.remainingBeds,
      }));

      setAlert({ type: "success", message: r.message || "Lit réservé." });
    } catch (e) {
      setAlert({ type: "danger", message: e.message || "Erreur réservation." });
    } finally {
      setLoading(false);
    }
  }

  function onReset() {
    setResult(null);
    setAlert(null);
  }

  // ✅ Si pas connecté : on affiche le Login (Bootstrap)
  if (!isAuthed) {
    return <Login onLoginSuccess={() => setIsAuthed(true)} />;
  }

  // ✅ Si connecté : on affiche ton app normale
  return (
    <div className="bg-light min-vh-100">
      <div className="container py-4" style={{ maxWidth: 980 }}>
       <Header onLogout={() => setIsAuthed(false)} />


        <AlertBox alert={alert} />

        <div className="row g-3">
          <div className="col-12 col-lg-5">
            <RecommendationForm
              loading={loading}
              specialities={specialities}
              zones={zones}
              selectedSpeciality={selectedSpeciality}
              selectedZone={selectedZone}
              onChangeSpeciality={setSelectedSpeciality}
              onChangeZone={setSelectedZone}
              onSubmit={onRecommend}
            />
          </div>

          <div className="col-12 col-lg-7">
            <RecommendationResult
              loading={loading}
              result={result}
              selectedSpeciality={selectedSpeciality}
              selectedZoneLabel={selectedZoneLabel}
              onReset={onReset}
              onReserve={onReserve}
            />
          </div>
        </div>

        <div className="text-center text-secondary small mt-4">
          Front : <span className="font-monospace">:5173</span> · Backend :{" "}
          <span className="font-monospace">:8080</span>
        </div>
      </div>
    </div>
  );
}
