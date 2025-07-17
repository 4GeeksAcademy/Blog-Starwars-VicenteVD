import React, { useContext } from "react";
import { StoreContext }   from "../context/StoreContext";
import { addFavorite, removeFavorite } from "../context/actions";

const FavoriteButton = ({ id, name, entityType }) => {
  const { state, dispatch } = useContext(StoreContext);

  // Comprobamos existencia por id + tipo
  const isFav = state.favorites.some(
    fav => fav.id === id && fav.entityType === entityType
  );

  const handleClick = () => {
    if (isFav) {
      dispatch(removeFavorite(id, entityType));
    } else {
      dispatch(addFavorite({ id, name, entityType }));
    }
  };

  return (
    <button
      className={`btn btn-sm ${isFav ? "btn-danger" : "btn-outline-success"}`}
      onClick={handleClick}
    >
      {isFav ? "❌ Quitar" : "✅ Favorito"}
    </button>
  );
};

export default FavoriteButton;