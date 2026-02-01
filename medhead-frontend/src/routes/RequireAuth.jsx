import { Navigate, Outlet } from "react-router-dom";
import { getToken } from "../services/api";

export default function RequireAuth() {
  const authed = !!getToken();
  return authed ? <Outlet /> : <Navigate to="/login" replace />;
}
