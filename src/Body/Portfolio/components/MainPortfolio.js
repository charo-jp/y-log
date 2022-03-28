import React from "react";
import { Outlet } from "react-router-dom";
import CategorySelector from "../../../shared/components/UIElements/CategorySelector";

const MainPortfolio = (props) => {

  return (
    <React.Fragment>
      <CategorySelector
        categories={["Web-related", "AI-related"]}
        path="/portfolio/"
        cName = "category-portfolio"
      />
      <div className = "cards">
        <Outlet />
      </div>
    </React.Fragment>
  );
};

export default MainPortfolio;
