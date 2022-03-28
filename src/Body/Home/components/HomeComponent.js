import React from "react";

import "./HomeComponent.css";

const HomeComponent = props => {
  
  return (<div className = "home-component">
    <h2 className = "home-component-title">{props.title}</h2>
    <div className = "home-grid-container">
      <img className = {`home-pic `} src= {props.avif} type="image/avif" loading = "lazy"/>
      <p className = {`home-component-content `}>{props.children}</p>
    </div>
  </div>)
}

export default HomeComponent;
