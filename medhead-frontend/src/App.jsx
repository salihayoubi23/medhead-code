import { Routes, Route, Navigate } from "react-router-dom";

import Home from "./pages/Home";
import Login from "./pages/Login";
import NotFound from "./pages/NotFound";
import RequireAuth from "./routes/RequireAuth";

export default function App() {
  return (
    <Routes>
      {/* redirect root */}
      <Route path="/" element={<Navigate to="/home" replace />} />

      {/* public */}
      <Route path="/login" element={<Login />} />

      {/* protected group */}
      <Route element={<RequireAuth />}>
        <Route path="/home" element={<Home />} />
      </Route>

      {/* 404 */}
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}
