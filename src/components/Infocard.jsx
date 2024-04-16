import React from "react";

const Infocard = ({ title, percentage }) => {
  return (
    <span>
      <h3>{title}</h3>
      <p>{percentage}</p>
    </span>
  );
};

export default Infocard;
