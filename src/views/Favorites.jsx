// src/views/Favorites.jsx
import React, { useContext } from "react";
import { StoreContext } from "../context/StoreContext";
import EntityGrid from "../components/EntityGrid";

const Favorites = () => {
  const { state } = useContext(StoreContext);

  return (
    <div>
      <h2 className="mb-3">Mis Favoritos</h2>
      {state.favorites.length === 0 ? (
        <p>No has guardado nada aún. ¡Ve a explorar la galaxia!</p>
      ) : (
        <EntityGrid items={state.favorites} entityType={item => item.entityType} />
      )}
    </div>
  );
};

export default Favorites;