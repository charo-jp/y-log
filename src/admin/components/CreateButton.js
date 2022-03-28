import React from "react";
import { Link } from "react-router-dom";
import "./CreateButton.css";

const CreateButton = (props) => {
  const { name, category, type } = props;

  if (type.includes("edit")) {
    const {id} = props;
    return (
      <Link
        to={`/admin/${name}/${category}/edit/${id}`}
        className = "edit-post"
        onClick = {()=> {props.onClick(name, id)}}
      >{props.children}</Link>
    )
  }
  return (
      <Link 
        to={`/admin/${name}/${category}/${type}`} 
        className="create-new-post"
      >
        + New
      </Link>
  );
};

export default CreateButton;
