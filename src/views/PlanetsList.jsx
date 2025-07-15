import React, { useEffect, useState } from "react";
import { getPlanets } from "../services/api";
import EntityGrid from "../components/EntityGrid";
import LoadingSpinner from "../components/LoadingSpinner";
import ErrorAlert from "../components/ErrorAlert";

const PlanetsList = () => {
  const [planets, setPlanets] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError]     = useState(null);

  useEffect(() => {
    getPlanets()
      .then(data => setPlanets(data))
      .catch(err => setError(err.message))
      .finally(() => setLoading(false));
  }, []);

  if (loading) return <LoadingSpinner />;
  if (error)   return <ErrorAlert message={error} />;

  return (
    <div>
      <h2 className="mb-3">Planetas</h2>
      <EntityGrid items={planets} entityType="planets" />
    </div>
  );
};

export default PlanetsList;