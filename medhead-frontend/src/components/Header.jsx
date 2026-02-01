import { useNavigate } from "react-router-dom";
import { clearToken } from "../services/api";

export default function Header() {
  const navigate = useNavigate();

  function handleLogout() {
    clearToken();
    navigate("/login", { replace: true }); // ✅ l’URL devient /login
  }

  return (
    <div className="d-flex align-items-start justify-content-between gap-3 mb-3">
      <div>
        <h1 className="h3 mb-1">MedHead – PoC</h1>
        <div className="text-secondary">
          Recommandation d’hôpital (spécialité + lits + distance simulée)
        </div>
      </div>

      <div className="d-flex align-items-center gap-2">
        <span className="badge text-bg-dark">Backend : :8080</span>

        <button className="btn btn-outline-danger btn-sm" onClick={handleLogout}>
          Déconnexion
        </button>
      </div>
    </div>
  );
}
