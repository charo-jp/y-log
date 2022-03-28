import React from "react";
import { Link } from "react-router-dom";

import "./Button.css";

const Button = props => {
  if (props.type === "image") {
    return (
      <Link className = "image-button" to = {props.to}>{props.children}</Link>
    )
  }
  if (props.type === "detail") {
    return (
      <Link className = {`button detail`} to = {props.to}>{props.text}</Link>
    )
  }
  if (props.type === "contact") {
    return (
      <button type = "submit" className = "button" >
        Submit
      </button>
    )
  }
  if (props.type === "login") {
    return (
      <button type = "submit" className="button">
        Login
      </button>
    )
  }

  return <button className = {`button ${props.cName}`} onClick ={props.onClick}>
    {props.text}
  </button>

}

export default Button;