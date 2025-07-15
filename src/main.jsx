import React from "react";
import ReactDOM from "react-dom/client"; // 📌 Importa desde 'react-dom/client'
import App from "./App";
import { StoreProvider } from "./context/StoreContext";

// Obtén el contenedor root de tu index.html
const container = document.getElementById("root");

// Crea el root y renderiza como en React 18
const root = ReactDOM.createRoot(container);
root.render(
  <React.StrictMode>
    <StoreProvider>
      <App />
    </StoreProvider>
  </React.StrictMode>
);