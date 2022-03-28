import React from "react";

import MainPortfolio from "../components/MainPortfolio";

import "./Portfolio.css";
const Portfolio = () => {
  return (
    <React.Fragment>
      <h2 className = "portfolio-title">Portfolio</h2>
      <MainPortfolio />
    </React.Fragment>
  );
};

export default Portfolio;
