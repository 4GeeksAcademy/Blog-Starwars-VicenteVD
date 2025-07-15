import React, { useEffect, useState } from "react";
import { getPeople } from "../services/api";
import EntityGrid from "../components/EntityGrid";
import LoadingSpinner from "../components/LoadingSpinner";
import ErrorAlert from "../components/ErrorAlert";

const PeopleList = () => {
  const [people, setPeople]   = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError]     = useState(null);

  useEffect(() => {
    getPeople()
      .then(data => setPeople(data))
      .catch(err => setError(err.message))
      .finally(() => setLoading(false));
  }, []);

  if (loading) return <LoadingSpinner />;
  if (error)   return <ErrorAlert message={error} />;

  return (
    <div>
      <h2 className="mb-3">Personajes</h2>
      <EntityGrid items={people} entityType="people" />
    </div>
  );
};

export default PeopleList;