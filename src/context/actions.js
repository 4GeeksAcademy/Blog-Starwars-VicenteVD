// src/context/actions.js

// Tipos de acción
export const ADD_FAVORITE    = "ADD_FAVORITE";
export const REMOVE_FAVORITE = "REMOVE_FAVORITE";

// Creadores de acción
export const addFavorite = (entity) => ({
  type: ADD_FAVORITE,
  payload: entity,
});

export const removeFavorite = (entityId) => ({
  type: REMOVE_FAVORITE,
  payload: entityId,
});