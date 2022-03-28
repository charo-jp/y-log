import React from "react";
import Button from "./Button";
import  "./Card.css";

const Card = props => {

  return (
  <div className = "card" data-aos="fade-up">
    <div className = "card-pic" >
      <Button type = "image" to = {props.to}>
        <img className = "" src = {props.cardpic} alt = {props.alt} />
      </Button>
    </div>
    <div className = "card-text-component" >
      <h2 className="card-title" >{props.title}</h2>
      <p className ="card-createdAt">{props.createdAt}</p>
      <p className="card-description">{props.shortDescription}</p>
      <Button type = "detail" text = "Read More" to = {props.to}  />
    </div>
  </div>)
}

export default Card;