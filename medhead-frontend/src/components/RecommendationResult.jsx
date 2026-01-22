function formatKm(value) {
  if (value === null || value === undefined) return "—";
  const n = Number(value);
  if (Number.isNaN(n)) return "—";
  return n.toFixed(1);
}

export default function RecommendationResult({
  loading,
  result,
  selectedSpeciality,
  selectedZoneLabel,
  onReset,
  onReserve,
}) {
  const hasRecommendation = Boolean(result?.hospitalName);
  const canReserve = Boolean(result?.hospitalId) && Number(result?.availableBeds) > 0;

  return (
    <div className="card shadow-sm h-100">
      <div className="card-header bg-white d-flex align-items-center justify-content-between">
        <div className="fw-semibold">Résultat</div>
        {hasRecommendation ? (
          <span className="badge text-bg-success">Recommandé</span>
        ) : (
          <span className="badge text-bg-secondary">En attente</span>
        )}
      </div>

      <div className="card-body">
        {!result ? (
          <div className="text-secondary">
            Lance une recommandation pour afficher un résultat.
          </div>
        ) : !hasRecommendation ? (
          <div className="text-secondary">
            {result?.reason || "Aucun résultat."}
          </div>
        ) : (
          <>
            {/* Rappel de la demande */}
            <div className="p-3 rounded border bg-white mb-3">
              <div className="text-secondary small mb-2">📌 Demande</div>
              <div className="d-flex flex-wrap gap-2">
                <span className="badge text-bg-light border">
                  <span className="text-secondary">Spécialité :</span>{" "}
                  <b>{selectedSpeciality || "—"}</b>
                </span>
                <span className="badge text-bg-light border">
                  <span className="text-secondary">Zone :</span>{" "}
                  <b>{selectedZoneLabel || "—"}</b>
                </span>
              </div>
            </div>

            {/* Titre */}
            <div className="mb-2">
              <div className="h5 mb-0">{result.hospitalName}</div>
              <div className="text-secondary small">
                ID : <span className="font-monospace">{result.hospitalId}</span>
              </div>
            </div>

            {/* KPIs */}
            <div className="row g-2 mb-3">
              <div className="col-12 col-md-4">
                <div className="border rounded p-3 bg-white stat-card">
                  <div className="text-secondary small">Lits disponibles</div>
                  <div className="fs-4 fw-semibold">{result.availableBeds ?? "—"}</div>
                </div>
              </div>

              <div className="col-12 col-md-4">
                <div className="border rounded p-3 bg-white stat-card">
                  <div className="text-secondary small">Distance</div>
                  <div className="fs-4 fw-semibold">{formatKm(result.distanceKm)} km</div>
                </div>
              </div>

              <div className="col-12 col-md-4">
                <div className="border rounded p-3 bg-white stat-card">
                  <div className="text-secondary small">Durée</div>
                  <div className="fs-4 fw-semibold">{result.durationMin ?? "—"} min</div>
                </div>
              </div>
            </div>

            {/* Raison */}
            <div className="mb-3">
              <div className="text-secondary small mb-1">Raison</div>
              <div className="border rounded p-2 bg-white">
                {result.reason || "—"}
              </div>
            </div>

            {/* Actions */}
            <div className="d-flex flex-wrap gap-2 align-items-center">
              <button
                type="button"
                className="btn btn-outline-primary"
                onClick={onReserve}
                disabled={!canReserve || loading}
                title={!canReserve ? "Aucun lit disponible" : "Réserver 1 lit"}
              >
                {loading ? (
                  <>
                    <span className="spinner-border spinner-border-sm me-2" aria-hidden="true"></span>
                    Réservation…
                  </>
                ) : (
                  "Réserver un lit"
                )}
              </button>

              <button
                type="button"
                className="btn btn-outline-secondary"
                onClick={onReset}
                disabled={loading}
              >
                Nouvelle demande
              </button>

              {!canReserve ? (
                <span className="text-secondary small">(désactivé si lits = 0)</span>
              ) : null}
            </div>
          </>
        )}
      </div>
    </div>
  );
}
