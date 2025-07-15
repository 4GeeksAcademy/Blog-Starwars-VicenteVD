import React, { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { searchEntities } from "../services/api";

const SearchBar = () => {
  const [term, setTerm] = useState("");
  const [results, setResults] = useState([]);  
  const [loading, setLoading] = useState(false);
  const [showMenu, setShowMenu] = useState(false);
  const navigate = useNavigate();
  const ref = useRef();

  // Cerramos el menú si hacemos clic fuera
  useEffect(() => {
    const handleClickOutside = e => {
      if (ref.current && !ref.current.contains(e.target)) {
        setShowMenu(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Debounce y búsqueda
  useEffect(() => {
    if (term.trim().length < 2) {
      setResults([]);
      return;
    }
    setLoading(true);
    const timeout = setTimeout(async () => {
      // Búscala en los tres tipos
      const [p, pl, v] = await Promise.all([
        searchEntities("people", term),
        searchEntities("planets", term),
        searchEntities("vehicles", term),
      ]);
      setResults([...p, ...pl, ...v]);
      setLoading(false);
      setShowMenu(true);
    }, 300);  // 300 ms tras tecleo

    return () => clearTimeout(timeout);
  }, [term]);

  const handleSelect = item => {
    setShowMenu(false);
    navigate(`/${item.entityType}/${item.id}`);
    setTerm("");
  };

  return (
    <div className="position-relative" ref={ref} style={{ minWidth: "250px" }}>
      <input
        type="text"
        className="form-control"
        placeholder="Buscar..."
        value={term}
        onChange={e => setTerm(e.target.value)}
        onFocus={() => term && setShowMenu(true)}
      />

      {showMenu && (
        <ul className="list-group position-absolute w-100" style={{ zIndex: 1000 }}>
          {loading && <li className="list-group-item">Cargando...</li>}
          {!loading && results.length === 0 && (
            <li className="list-group-item text-muted">Sin resultados</li>
          )}
          {!loading && results.map(item => (
            <li
              key={`${item.entityType}-${item.id}`}
              className="list-group-item list-group-item-action"
              onClick={() => handleSelect(item)}
              style={{ cursor: "pointer" }}
            >
              <strong>{item.name}</strong>
              <small className="text-muted ms-2">[{item.entityType}]</small>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default SearchBar;