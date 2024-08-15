import React from "react";

const TitleBar = ({ title, style }) => (
  <h1 className="fw-bold" style={style}>
    {title}
  </h1>
);

export default TitleBar;
