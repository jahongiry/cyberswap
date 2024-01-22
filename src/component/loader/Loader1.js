import React from "react";
import "./loader1.css";

const Loader = () => {
  return (
    <div className="loader1">
      <div className="loader1-container">
        <div className="ring"></div>
        <div className="ring"></div>
        <div className="ring"></div>
        <span className="loading">Loading...</span>
      </div>
    </div>
  );
};

export default Loader;
