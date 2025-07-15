import React from "react";

const LoadingSpinner = () => (
  <div className="d-flex justify-content-center my-5">
    <div className="spinner-border text-warning" role="status">
      <span className="visually-hidden">Cargando...</span>
    </div>
  </div>
);

export default LoadingSpinner;