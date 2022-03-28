import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { BsFillArrowLeftCircleFill } from "react-icons/bs";
import { AdminContext } from "../../contexts/AdminContext";
import "./GoBack.css";

const GoBack = (props) => {
  const auth = useContext(AdminContext);
  if (props.logout) {
    return (
      <div className = "go-back-container">
        <Link className = "go-back" onClick = {() => {auth.logout()}} to = "/admin"><BsFillArrowLeftCircleFill />{props.text ? props.text:"Back"}</Link>
      </div>
    )
  }
  return (
    <div className = "go-back-container">
      <Link className = "go-back" to = {props.to}><BsFillArrowLeftCircleFill />{props.text ? props.text:"Back"}</Link>
    </div>
  )
}

export default GoBack;