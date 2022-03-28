import React, {useEffect} from "react";
import { useLocation } from "react-router-dom";

import "./Admin.css";


import MainAdmin from "../components/MainAdmin";

const Admin = props => {
  const location = useLocation();
  
  useEffect(() => {
    props.setAdmin(location.pathname);
    return (() => {
      props.setAdmin("")
    })
  }, [location, props.setAdmin])
  
  return (
    <div className="admin">
      <div className = "main-admin-display">
        <MainAdmin />
      </div>
    </div>
    )
}

export default Admin;