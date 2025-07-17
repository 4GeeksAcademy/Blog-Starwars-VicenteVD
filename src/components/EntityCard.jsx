import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { getImageUrl, getEntityDetail, fetchResource } from "../services/api";
import FavoriteButton from "./FavoriteButton";

const EntityCard = ({ item, entityType }) => {
  const { id, name } = item;
  const imgUrl = getImageUrl(entityType, id);

  const [details, setDetails] = useState(null);
  const [speciesName, setSpeciesName] = useState("Unknown");

  useEffect(() => {
    let cancelled = false;

    getEntityDetail(entityType, id)
      .then(data => {
        if (cancelled) return;
        setDetails(data);

        // Solo para personajes: fetch de la primera especie
        if (entityType === "people") {
          const urls = data.properties.species;
          if (Array.isArray(urls) && urls.length > 0) {
            return fetchResource(urls[0]);
          }
        }
      })
      .then(json => {
        if (cancelled || !json) return;
        setSpeciesName(json.result.properties.name);
      })
      .catch(err => {
        if (!cancelled) console.error(err);
      });

    return () => { cancelled = true; };
  }, [entityType, id]);

  const renderDetails = () => {
    if (!details) {
      return (
        <div className="mt-2">
          <div className="spinner-grow spinner-grow-sm text-secondary" role="status">
            <span className="visually-hidden">Cargando...</span>
          </div>
        </div>
      );
    }

    const p = details.properties;
    switch (entityType) {
      case "people":
        return (
          <p className="card-text mb-3">
            <strong>Gender:</strong> {p.gender}<br/>
            <strong>Species:</strong> {speciesName}<br/>
            <strong>Birt Year:</strong> {p.birth_year}
          </p>
        );
      case "vehicles":
        return (
          <p className="card-text mb-3">
            <strong>Model:</strong> {p.model}<br/>
            <strong>Manufacturer:</strong> {p.manufacturer}<br/>
            <strong>Passengers:</strong> {p.passengers}
          </p>
        );
      case "planets":
        return (
          <p className="card-text mb-3">
            <strong>Population:</strong> {p.population}<br/>
            <strong>Climate:</strong> {p.climate}<br/>
            <strong>Terrain:</strong> {p.terrain}
          </p>
        );
      default:
        return null;
    }
  };

  return (
    <div className="card h-100">
      <Link to={`/${entityType}/${id}`}>
        <img
          src={imgUrl}
          className="card-img-top"
          alt={name}
          // onError={e => {
          //   e.target.src = "https://via.placeholder.com/200x200?text=No+Image";
          // }}
        />
      </Link>
      <div className="card-body d-flex flex-column">
        <h4 className="card-title">{name}</h4> <br />

        {renderDetails()}

        <div className="mt-auto">
          <FavoriteButton
            id={id}
            name={name}
            entityType={entityType}
          />
        </div>
      </div>
    </div>
  );
};

export default EntityCard;