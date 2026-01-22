import { useEffect, useMemo, useState } from "react";
import {
  fetchOriginZones,
  fetchSpecialities,
  recommendHospital,
  reserveBed,
} from "../services/api";

export function formatKm(value) {
  if (value === null || value === undefined) return "—";
  const n = Number(value);
  if (Number.isNaN(n)) return "—";
  return n.toFixed(1);
}

export default function useMedhead() {
  const [specialities, setSpecialities] = useState([]);
  const [zones, setZones] = useState([]);

  const [selectedSpeciality, setSelectedSpeciality] = useState("");
  const [selectedZone, setSelectedZone] = useState("");

  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState(null);

  const [alert, setAlert] = useState(null); // { type, message }

  useEffect(() => {
    let cancelled = false;

    async function init() {
      try {
        const [specs, z] = await Promise.all([fetchSpecialities(), fetchOriginZones()]);
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
  }, []);

  const selectedZoneLabel = useMemo(() => {
    return zones.find((x) => x.value === selectedZone)?.label || selectedZone || "—";
  }, [zones, selectedZone]);

  async function recommend(e) {
    e?.preventDefault?.();
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
    } catch (err) {
      setResult(null);
      setAlert({ type: "danger", message: err.message || "Erreur recommandation." });
    } finally {
      setLoading(false);
    }
  }

  const canReserve = Boolean(result?.hospitalId) && Number(result?.availableBeds) > 0;

  async function reserve() {
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
    } catch (err) {
      setAlert({ type: "danger", message: err.message || "Erreur réservation." });
    } finally {
      setLoading(false);
    }
  }

  function dismissAlert() {
    setAlert(null);
  }

  return {
    // data
    specialities,
    zones,
    result,
    alert,
    loading,

    // selection
    selectedSpeciality,
    selectedZone,
    selectedZoneLabel,
    setSelectedSpeciality,
    setSelectedZone,

    // actions
    recommend,
    reserve,
    canReserve,
    dismissAlert,
  };
}
