import { Routes, Route, Navigate } from "react-router-dom";
import { Dashboard } from "../../features/dashboard/pages/Dashboard";
import { PlacesPage } from "../../features/places/page/PlacesPage";
import { EventsPage } from "../../features/events/pages/EventsPage";
import { PlaceFormPage } from "../../features/places/page/PlaceFormPage";
import { EventFormPage } from "../../features/events/pages/EventFormPage";
import { DriversPage } from "../../features/drivers/pages/DriversPage";
import { DriverFormPage } from "../../features/drivers/pages/DriverFormPage";


export const PrivateRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<Dashboard />} />

      <Route path="/places/new" element={<PlaceFormPage />} />
      <Route path="/places/edit/:placeId" element={<PlaceFormPage />} />
      <Route path="/places" element={<PlacesPage />} />

      <Route path="/events/new" element={<EventFormPage />} />
      <Route path="/events/edit/:eventId" element={<EventFormPage />} />
      <Route path="/events" element={<EventsPage />} />

      {/* <Route path="/profile" element={<Profile />} /> */}

      <Route path="/drivers" element={<DriversPage />} />
      <Route path="/drivers/new" element={<DriverFormPage />} />

      {/* Si accede a una ruta no definida en privado, lo llevamos al dashboard */}
      <Route path="*" element={<Navigate to="/" />} />
    </Routes>
  );
};