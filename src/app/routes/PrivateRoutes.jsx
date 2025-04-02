import { Routes, Route, Navigate } from "react-router-dom";
import { Dashboard } from "../../features/dashboard/pages/Dashboard";
import { PlacesPage } from "../../features/places/page/PlacesPage";
import { EventsPage } from "../../features/events/pages/EventsPage";
import { PlaceFormPage } from "../../features/places/page/PlaceFormPage";


export const PrivateRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<Dashboard />} />

      <Route path="/places/new" element={<PlaceFormPage />} />
      <Route path="/places/edit/:placeId" element={<PlaceFormPage />} />
      <Route path="/places" element={<PlacesPage />} />

      <Route path="/events" element={<EventsPage />} />
      {/* <Route path="/profile" element={<Profile />} /> */}
      {/* Si accede a una ruta no definida en privado, lo llevamos al dashboard */}
      <Route path="*" element={<Navigate to="/" />} />
    </Routes>
  );
};