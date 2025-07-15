import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { getPeople, getPlanets, getVehicles } from "../services/api";
import EntityCard from "../components/EntityCard";
import LoadingSpinner from "../components/LoadingSpinner";
import ErrorAlert from "../components/ErrorAlert";

const Home = () => {
  // States para cada sección
  const [people, setPeople]     = useState([]);
  const [planets, setPlanets]   = useState([]);
  const [vehicles, setVehicles] = useState([]);
  const [loading, setLoading]   = useState(true);
  const [error, setError]       = useState(null);

  useEffect(() => {
    // Cargamos sólo 4 items por sección para preview
    Promise.all([
      getPeople(1),
      getPlanets(1),
      getVehicles(1),
    ])
      .then(([p, pl, v]) => {
        setPeople(p);
        setPlanets(pl);
        setVehicles(v);
      })
      .catch(err => setError(err.message))
      .finally(() => setLoading(false));
  }, []);

  if (loading) return <LoadingSpinner />;
  if (error)   return <ErrorAlert message={error} />;

  return (
    <div className="container">
      {/* Sección Personajes */}
      <section className="mb-5">
        <h2>
          <Link to="/people" className="text-decoration-none text-dark">
            Personajes
          </Link>
        </h2>
        <div className="d-flex overflow-auto py-2">
          {people.map(person => (
            <div key={person.id} className="me-3" style={{ minWidth: 200 }}>
              <EntityCard item={person} entityType="people" />
            </div>
          ))}
        </div>
      </section>

      {/* Sección Planetas */}
      <section className="mb-5">
        <h2>
          <Link to="/planets" className="text-decoration-none text-dark">
            Planetas
          </Link>
        </h2>
        <div className="d-flex overflow-auto py-2">
          {planets.map(planet => (
            <div key={planet.id} className="me-3" style={{ minWidth: 200 }}>
              <EntityCard item={planet} entityType="planets" />
            </div>
          ))}
        </div>
      </section>

      {/* Sección Vehículos */}
      <section className="mb-5">
        <h2>
          <Link to="/vehicles" className="text-decoration-none text-dark">
            Vehículos
          </Link>
        </h2>
        <div className="d-flex overflow-auto py-2">
          {vehicles.map(vehicle => (
            <div key={vehicle.id} className="me-3" style={{ minWidth: 200 }}>
              <EntityCard item={vehicle} entityType="vehicles" />
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};

export default Home;