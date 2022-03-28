import React from "react";

import MainNavigation from "../components/MainNavigation";
import SubHeader from "../components/SubHeader";

import "./Header.css";

const Header = () => {
  return (<header>
    <MainNavigation />
    <SubHeader />
  </header>)
}

export default Header;