import React from "react";
import EntityCard from "./EntityCard";

const EntityGrid = ({ items, entityType }) => (
  <div className="row">
    {items.map(item => (
      <div key={item.id} className="col-sm-6 col-md-4 col-lg-3 mb-4">
        <EntityCard item={item} entityType={entityType} />
      </div>
    ))}
  </div>
);

export default EntityGrid;