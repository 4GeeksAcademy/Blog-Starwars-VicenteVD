import React from "react";
import { Link } from "react-router-dom";
import { getImageUrl } from "../services/api";
import FavoriteButton from "./FavoriteButton";

const EntityCard = ({ item, entityType }) => {
  const imgUrl = getImageUrl(entityType, item.id);

  return (
    <div className="card h-100">
      <Link to={`/${entityType}/${item.id}`}>
        <img 
          src={imgUrl} 
          className="card-img-top" 
          alt={item.name}
        //   onError={e => { e.target.src = "/placeholder.png"; }}
        />
      </Link>
      <div className="card-body d-flex flex-column">
        <h5 className="card-title">{item.name}</h5>
        <div className="mt-auto">
          <FavoriteButton item={{ ...item, entityType }} />
        </div>
      </div>
    </div>
  );
};

export default EntityCard;