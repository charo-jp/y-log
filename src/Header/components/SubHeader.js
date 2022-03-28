import React from "react";
import { useLocation } from "react-router-dom";

import "./SubHeader.css";
const SubHeader = () => {
  const location = useLocation();
  
  if (location.pathname === "/") {
    return (
      <div className="sub-header">
        <div className="sub-header-container">
          <h2 className="hello">Hello,</h2>
          <h2>
            I'm Yuya Hochi.
          </h2>
        </div>
    </div>
    )}
  return <div></div>;
};

export default SubHeader;
