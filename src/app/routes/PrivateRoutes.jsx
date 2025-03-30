import { Routes, Route, Navigate } from "react-router-dom";
import { Dashboard } from "../../features/dashboard/pages/Dashboard";


export const PrivateRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<Dashboard />} />
      {/* <Route path="/profile" element={<Profile />} /> */}
      {/* Si accede a una ruta no definida en privado, lo llevamos al dashboard */}
      <Route path="*" element={<Navigate to="/" />} />
    </Routes>
  );
};