// src/context/reducer.js

import { ADD_FAVORITE, REMOVE_FAVORITE } from "./actions";

const initialState = {
  favorites: [],  // aquí almacenaremos los elementos guardados
};

function reducer(state = initialState, action) {
  switch (action.type) {
    case ADD_FAVORITE:
      // Evitamos duplicados
      if (state.favorites.some(item => item.id === action.payload.id)) {
        return state;
      }
      return {
        ...state,
        favorites: [...state.favorites, action.payload],
      };

    case REMOVE_FAVORITE:
      return {
        ...state,
        favorites: state.favorites.filter(item => item.id !== action.payload),
      };

    default:
      return state;
  }
}

export default reducer;