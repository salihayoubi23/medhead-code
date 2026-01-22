export default function Header() {
  return (
    <div className="d-flex align-items-start justify-content-between gap-3 mb-3">
      <div>
        <h1 className="h3 mb-1">MedHead – PoC</h1>
        <div className="text-secondary">
          Recommandation d’hôpital (spécialité + lits + distance simulée)
        </div>
      </div>

      <span className="badge text-bg-dark align-self-center">Backend : :8080</span>
    </div>
  );
}
