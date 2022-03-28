import React from "react";
import { Outlet } from "react-router-dom";
import CategorySelector from "../../../shared/components/UIElements/CategorySelector";


const MainBlog = () => {

    return (
      <React.Fragment>
        <CategorySelector
          categories={["Tech", "Productivity", "Life", "NBA", "Charo"]}
          path="/blog/"
          cName="category-blog"
        />
        <div className = "cards">
          <Outlet />
        </div>
      </React.Fragment>
    );
};

export default MainBlog;
