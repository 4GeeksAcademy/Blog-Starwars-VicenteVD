import React, { useEffect, useState } from "react";
import { getVehicles } from "../services/api";
import EntityGrid from "../components/EntityGrid";
import LoadingSpinner from "../components/LoadingSpinner";
import ErrorAlert from "../components/ErrorAlert";

const VehiclesList = () => {
  const [vehicles, setVehicles] = useState([]);
  const [loading, setLoading]   = useState(true);
  const [error, setError]       = useState(null);

  useEffect(() => {
    getVehicles()
      .then(data => setVehicles(data))
      .catch(err => setError(err.message))
      .finally(() => setLoading(false));
  }, []);

  if (loading) return <LoadingSpinner />;
  if (error)   return <ErrorAlert message={error} />;

  return (
    <div>
      <h2 className="mb-3">Vehículos</h2>
      <EntityGrid items={vehicles} entityType="vehicles" />
    </div>
  );
};

export default VehiclesList;