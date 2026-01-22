export default function RecommendationForm({
  loading,
  specialities,
  zones,
  selectedSpeciality,
  selectedZone,
  onChangeSpeciality,
  onChangeZone,
  onSubmit,
}) {
  const selectedZoneLabel =
    zones.find((x) => x.value === selectedZone)?.label || selectedZone || "—";

  return (
    <div className="card shadow-sm">
      <div className="card-header bg-white">
        <div className="fw-semibold">Demande</div>
      </div>

      <div className="card-body">
        <form onSubmit={onSubmit} className="vstack gap-3">
          <div>
            <label className="form-label">Spécialité</label>
            <select
              className="form-select"
              value={selectedSpeciality}
              onChange={(e) => onChangeSpeciality(e.target.value)}
              disabled={loading || specialities.length === 0}
            >
              {specialities.map((s) => (
                <option key={s} value={s}>
                  {s}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="form-label">Zone d’origine</label>
            <select
              className="form-select"
              value={selectedZone}
              onChange={(e) => onChangeZone(e.target.value)}
              disabled={loading || zones.length === 0}
            >
              {zones.map((z) => (
                <option key={z.value} value={z.value}>
                  {z.label}
                </option>
              ))}
            </select>

            <div className="form-text">
              Sélectionnée : <b>{selectedZoneLabel}</b>
            </div>
          </div>

          <button className="btn btn-primary w-100" type="submit" disabled={loading}>
            {loading ? "Recherche..." : "Recommander"}
          </button>

          {loading ? (
            <div className="text-secondary small d-flex align-items-center gap-2">
              <span className="spinner-border spinner-border-sm" aria-hidden="true"></span>
              <span>Calcul de la meilleure recommandation…</span>
            </div>
          ) : null}
        </form>
      </div>
    </div>
  );
}
