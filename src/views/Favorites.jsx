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
        <div className="row">
          {state.favorites.map(fav => (
            <div key={`${fav.entityType}-${fav.id}`} className="col-sm-6 col-md-4 col-lg-3 mb-4">
              {/* Aquí sí pasamos entityType explícito */}
              <EntityGrid 
                items={[fav]} 
                entityType={fav.entityType} 
              />
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Favorites;