import { useState } from "react";
import { login } from "../services/api";

export default function Login({ onLoginSuccess }) {
  const [email, setEmail] = useState("admin@medhead.local");
  const [password, setPassword] = useState("Admin123!");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  async function handleSubmit(e) {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      await login(email, password);
      onLoginSuccess();
    } catch (err) {
      setError(err?.message || "Erreur de connexion");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="min-vh-100 d-flex align-items-center justify-content-center bg-light">
      <div className="container" style={{ maxWidth: "420px" }}>
        <div className="card shadow">
          <div className="card-body p-4">

            <h2 className="text-center mb-3">Connexion</h2>
            <p className="text-center text-muted mb-4">
              Accès sécurisé MedHead
            </p>

            {error && (
              <div className="alert alert-danger">
                {error}
              </div>
            )}

            <form onSubmit={handleSubmit}>

              <div className="mb-3">
                <label className="form-label">Email</label>
                <input
                  type="email"
                  className="form-control form-control-lg"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>

              <div className="mb-4">
                <label className="form-label">Mot de passe</label>
                <input
                  type="password"
                  className="form-control form-control-lg"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
              </div>

              <button
                type="submit"
                className="btn btn-primary btn-lg w-100"
                disabled={loading}
              >
                {loading ? "Connexion..." : "Se connecter"}
              </button>

            </form>

          </div>
        </div>

        <div className="text-center text-muted small mt-3">
          Backend sécurisé · JWT · Spring Boot
        </div>
      </div>
    </div>
  );
}
