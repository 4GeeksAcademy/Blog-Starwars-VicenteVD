import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getEntityDetail, getImageUrl } from "../services/api";
import LoadingSpinner from "../components/LoadingSpinner";
import ErrorAlert from "../components/ErrorAlert";
import FavoriteButton from "../components/FavoriteButton";

const EntityDetail = () => {
  const { entityType, id } = useParams();
  const [item, setItem] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    getEntityDetail(entityType, id)
      .then(data => setItem(data))
      .catch(err => setError(err.message))
      .finally(() => setLoading(false));
  }, [entityType, id]);

  if (loading) return <LoadingSpinner />;
  if (error) return <ErrorAlert message={error} />;

  const imgUrl = getImageUrl(entityType, id);

  return (
    <div className="card mb-4">
      <div className="row g-0">
        <div className="col-md-4">
          <img
            src={imgUrl}
            className="img-fluid rounded-start"
            alt={item.name}
            onError={e => {
              e.target.src = "https://via.placeholder.com/600x400?text=No+Image";
            }}
          />
        </div>
        <div className="col-md-8">
          <div className="card-body">
            <h3 className="card-title">{item.name}</h3>
            <FavoriteButton
              id={item.id}
              name={item.name}
              entityType={item.entityType}
            />
            <ul className="list-group list-group-flush mt-3">
              {Object.entries(item.properties).map(([key, value]) => (
                <li key={key} className="list-group-item">
                  <strong>{key.replace(/_/g, " ")}:</strong> {value}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EntityDetail;