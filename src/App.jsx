// src/App.jsx
import React from "react";
import { BrowserRouter as Router } from "react-router-dom";
import Navbar from "./components/Navbar";
import AppRoutes from "./routes";

const App = () => (
  <Router>
    <Navbar />
    <div className="container mt-4">
      <AppRoutes />
    </div>
  </Router>
);

export default App;