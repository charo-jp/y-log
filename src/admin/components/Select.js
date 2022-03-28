import React from "react";
import { Link } from "react-router-dom";
import GoBack from "../../shared/components/UIElements/GoBack";

import "./Select.css";

const Select = () => {

  return (
    <React.Fragment>
      <div className = "logout-or-go-home">
        <GoBack  text = "Logout" logout = {true}/>
        <GoBack  text = "Home" to = "/"/>
      </div>
    <div className="admin-select-category">
      <div className="admin-categories">
        <h2>Portfolio</h2>
        <div className="admin-category">
          <Link
            className="admin-to-editor-button"
            to="/admin/portfolio/web-related"
          >
            Web Related
          </Link>
          <Link className="admin-to-editor-button" 
                to="/admin/portfolio/ai-related" 
          >
            AI Related
          </Link>
        </div>
      </div>
      <div className="admin-categories">
        <h2>Blog</h2>
        <div className="admin-category">
          <Link className="admin-to-editor-button" to="/admin/blog/tech" >
            Tech
          </Link>
          <Link className="admin-to-editor-button" to="/admin/blog/productivity">
            Productivity
          </Link>
          <Link className="admin-to-editor-button" to="/admin/blog/life">
            Life
          </Link>
          <Link className="admin-to-editor-button" to="/admin/blog/nba">
            NBA
          </Link>
          <Link className="admin-to-editor-button" to="/admin/blog/charo">
            Charo
          </Link>
        </div>
      </div>
      <div className="admin-categories">
        <div className="admin-category">
          <h2>Contact</h2>
          <Link className="admin-to-editor-button" to="/admin/contact">
            Contact
          </Link>
        </div>
      </div>
    </div>
    </React.Fragment>
  );
};

export default Select;
