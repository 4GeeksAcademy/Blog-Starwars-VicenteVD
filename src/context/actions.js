export const ADD_FAVORITE    = "ADD_FAVORITE";
export const REMOVE_FAVORITE = "REMOVE_FAVORITE";

// Creadores de acción
// addFavorite recibe el objeto mínimo { id, name, entityType }
export const addFavorite = (favorite) => ({
  type: ADD_FAVORITE,
  payload: favorite,
});

// removeFavorite recibe id y entityType por separado
export const removeFavorite = (id, entityType) => ({
  type: REMOVE_FAVORITE,
  payload: { id, entityType },
});