import React from "react";

const ErrorAlert = ({ message }) => (
  <div className="alert alert-danger" role="alert">
    <strong>¡Oops!</strong> Ha ocurrido un error: {message}
  </div>
);

export default ErrorAlert;