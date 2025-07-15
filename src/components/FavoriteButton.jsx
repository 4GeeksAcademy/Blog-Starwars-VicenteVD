import React, { useContext } from "react";
import { StoreContext } from "../context/StoreContext";
import { addFavorite, removeFavorite } from "../context/actions";

const FavoriteButton = ({ item }) => {
  const { state, dispatch } = useContext(StoreContext);
  const isFav = state.favorites.some(fav => fav.id === item.id);

  const handleClick = () => {
    if (isFav) {
      dispatch(removeFavorite(item.id));
    } else {
      dispatch(addFavorite(item));
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