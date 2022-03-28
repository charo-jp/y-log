import React from "react";
import { Outlet } from "react-router-dom";

const MainAdmin = () => {
  return (
    <React.Fragment>
      <Outlet />
    </React.Fragment>
  )
}

export default MainAdmin;