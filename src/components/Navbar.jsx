import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { StoreContext } from "../context/StoreContext";

const Navbar = () => {
  const { state } = useContext(StoreContext);
  const { favorites } = state;

  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
      <div className="container">
        <Link className="navbar-brand" to="/">StarWars DB</Link>
        <button 
          className="navbar-toggler" 
          type="button" 
          data-bs-toggle="collapse" 
          data-bs-target="#navbarNavDropdown" 
          aria-controls="navbarNavDropdown" 
          aria-expanded="false" 
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarNavDropdown">
          <ul className="navbar-nav me-auto">
            <li className="nav-item">
              <Link className="nav-link" to="/people">Personajes</Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/planets">Planetas</Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/vehicles">Vehículos</Link>
            </li>
          </ul>

          {/* Dropdown de Favoritos */}
          <div className="nav-item dropdown">
            <button
              className="btn btn-outline-warning dropdown-toggle"
              id="favoritesDropdown"
              data-bs-toggle="dropdown"
              aria-expanded="false"
            >
              Favoritos
            </button>
            <ul
              className="dropdown-menu dropdown-menu-end"
              aria-labelledby="favoritesDropdown"
              style={{ minWidth: "220px" }}
            >
              {favorites.length === 0 ? (
                <li>
                  <span className="dropdown-item-text text-muted">
                    No hay favoritos
                  </span>
                </li>
              ) : (
                favorites.map((fav, idx) => (
                  <li key={`${fav.entityType}-${fav.id}-${idx}`}>
                    <Link
                      className="dropdown-item"
                      to={`/${fav.entityType}/${fav.id}`}
                    >
                      {fav.name}{" "}
                      <small className="text-muted">[{fav.entityType}]</small>
                    </Link>
                  </li>
                ))
              )}

              {/* Separador y botón Ver más */}
              <li><hr className="dropdown-divider" /></li>
              <li>
                <Link className="dropdown-item text-center" to="/favorites">
                  Ver más…
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;