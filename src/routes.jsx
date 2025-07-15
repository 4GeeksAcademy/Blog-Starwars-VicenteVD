import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import Home from "./views/Home";
import PeopleList from "./views/PeopleList";
import PlanetsList from "./views/PlanetsList";
import VehiclesList from "./views/VehiclesList";
import EntityDetail from "./views/EntityDetail";
import Favorites from "./views/Favorites";

// Componente que centraliza todas las rutas de la aplicación
const AppRoutes = () => (
  <Routes>
    <Route path="/" element={<Home />} />
    <Route path="/people" element={<PeopleList />} />
    <Route path="/planets" element={<PlanetsList />} />
    <Route path="/vehicles" element={<VehiclesList />} />
    <Route path="/:entityType/:id" element={<EntityDetail />} />
    <Route path="/favorites" element={<Favorites />} />
    <Route path="*" element={<Navigate to="/" replace />} />
  </Routes>
);

export default AppRoutes;