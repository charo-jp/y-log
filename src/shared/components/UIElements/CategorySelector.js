import React, { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import "./CategorySelector.css";

const CategorySelector = (props) => {
  const location = useLocation();
  const [selected, setSelected] = useState(location.pathname);

  useEffect(() => {
    if (props.path === "/portfolio/" || props.path === "/blog/") {
      setSelected(location.pathname);
    }
  }, [location]);

  return (
    <div className="categories">
      {props.categories.map((category) => {
        return (
          <Link
            to={props.path + category.toString().toLowerCase()}
            className={`category ${props.cName}`}
            key={category}
            onClick={() => {
              setSelected(props.path + category.toString().toLowerCase());
            }}
            style={
              selected === props.path + category.toString().toLowerCase()
                ? { backgroundColor: "black"}
                : { backgroundColor: "rgb(216, 216, 216)"}
            }
          >
            {category}
          </Link>
        );
      })}
    </div>
  );
};

export default CategorySelector;
