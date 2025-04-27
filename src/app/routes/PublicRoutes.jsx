import { Routes, Route, Navigate } from "react-router-dom";
import { Home } from "../../features/home/pages/Home";
import { LoginPage } from "../../features/auth/pages/LoginPage";

export const PublicRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<Home/>} />
      <Route path="/login" element={<LoginPage />} />
      {/* Si accede a una ruta no definida en público, lo llevamos a Home */}
      <Route path="*" element={<Navigate to="/" />} />
    </Routes>
  );
};