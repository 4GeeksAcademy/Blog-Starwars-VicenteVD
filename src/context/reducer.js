import { ADD_FAVORITE, REMOVE_FAVORITE } from "./actions";

const initialState = {
  favorites: [],
};

function reducer(state = initialState, action) {
  switch (action.type) {
    case ADD_FAVORITE:
      // Evitamos duplicados por id + tipo
      if (
        state.favorites.some(
          fav =>
            fav.id === action.payload.id &&
            fav.entityType === action.payload.entityType
        )
      ) {
        return state;
      }
      return {
        ...state,
        favorites: [...state.favorites, action.payload],
      };

    case REMOVE_FAVORITE:
      return {
        ...state,
        favorites: state.favorites.filter(
          fav =>
            !(
              fav.id === action.payload.id &&
              fav.entityType === action.payload.entityType
            )
        ),
      };

    default:
      return state;
  }
}

export default reducer;