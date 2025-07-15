import React, { createContext, useReducer, useEffect } from "react";
import reducer from "./reducer";

const STORAGE_KEY = "starwars-store";

export const StoreContext = createContext();

export const StoreProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, undefined, () => {
    const persisted = localStorage.getItem(STORAGE_KEY);
    return persisted ? JSON.parse(persisted) : { favorites: [] };
  });

  useEffect(() => {
    // Guardamos 500 ms tras el último cambio
    const timeout = setTimeout(() => {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
    }, 500);
    return () => clearTimeout(timeout);
  }, [state]);

  return (
    <StoreContext.Provider value={{ state, dispatch }}>
      {children}
    </StoreContext.Provider>
  );
};