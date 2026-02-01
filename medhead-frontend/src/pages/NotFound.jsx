import { Link } from "react-router-dom";

export default function NotFound() {
  return (
    <div className="min-vh-100 d-flex align-items-center justify-content-center bg-light">
      <div className="container" style={{ maxWidth: 520 }}>
        <div className="card shadow-sm text-center">
          <div className="card-body p-4 p-md-5">
            <div className="display-1 fw-bold text-danger mb-2">404</div>
            <h1 className="h4 mb-2">Page introuvable</h1>
            <p className="text-muted mb-4">
              L’adresse que tu as saisie n’existe pas ou a été déplacée.
            </p>

            <div className="d-flex justify-content-center gap-2">
              <Link className="btn btn-primary" to="/home">
                Aller à l’accueil
              </Link>
              <Link className="btn btn-outline-secondary" to="/login">
                Se connecter
              </Link>
            </div>

            <div className="text-muted small mt-4">
              MedHead PoC · React Router
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
