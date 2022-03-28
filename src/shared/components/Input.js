import React, { useState, useEffect } from "react";

import "./Input.css";

const Input = (props) => {
  const [input, setInput] = useState(props.initValue ? props.initValue : "");

  const [textarea, setTextarea] = useState(
    props.initValue ? props.initValue : ""
  );
  const { onInput } = props;

  useEffect(() => {
    let value = props.tag === "input" ? input : textarea;
    let isValid = true;
    if (
      props.placeholderAndId === "repoURL" ||
      props.placeholderAndId === "siteURL" ||
      props.placeholderAndId === "pic" ||
      props.placeholderAndId === "cardpic"
    ) {
      isValid = value.match(
        /(http(s)?:\/\/.)?(www\.)?[-a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_\+.~#?&//=]*)/g
      );
      if (isValid === null) {
        isValid = false;
      } else {
        isValid = true;
      }
    }
    if (props.placeholderAndId === "shortDescription") {
      isValid = value.length <= 170 && value.length >= 1;
    }
    if (
      props.placeholderAndId === "title" ||
      props.placeholderAndId === "markdown" ||
      props.placeholderAndId === "name" ||
      props.placeholderAndId === "message"
    ) {
      isValid = value.length >= 1;
    }
    if (props.placeholderAndId === "email"){
      isValid = value.match(/^\S+@\S+\.\S+$/);
      if (isValid === null) {
        isValid = false;
      } else {
        isValid = true;
      }
    }
    if (props.reset) {
      if (props.tag === "input") {
        setInput("")
      } else {
        setTextarea("")
      }
      value = "";
      props.resetFalseHandler();
    }
    onInput(props.placeholderAndId, value, isValid);
  }, [props.placeholderAndId, input, textarea, onInput, props.name, props.reset]);

  const handleInput = (event) => {
    setInput(event.target.value);
  };

  const handleTextarea = (event) => {
    setTextarea(event.target.value);
  };

  const handlePassword = (event) => {
    setInput(event.target.value);
    props.func(event.target.value.length);
  };

  const handleOnFocus = (event) => {
    props.onFocus(true);
  }

  const handleOnBlur = (event) => {
    props.onFocus(false);
  }

  if (props.tag === "input") {
    if (props.placeholderAndId === "password") {
      return (
        <input
          placeholder={props.placeholderAndId}
          className="input"
          id={props.placeholderAndId}
          type={props.type}
          required={props.required ? false : true}
          autoComplete={props.autoComplete ? "on" : "off"}
          value={input}
          onChange={handlePassword}
          onFocus = {handleOnFocus}
          onBlur = {handleOnBlur}
        />)
    }
    return (
      <input
        placeholder={props.placeholderAndId}
        className="input"
        id={props.placeholderAndId}
        type={props.type}
        required={props.required ? false : true}
        autoComplete={props.autoComplete ? "on" : "off"}
        value={input}
        onChange={handleInput}
      />
    );
  }

  return (
    <textarea
      className={props.cName}
      id={props.id}
      required={props.required ? false : true}
      autoComplete={props.autoComplete ? "on" : "off"}
      value={textarea}
      onChange={handleTextarea}
    />
  );
};

export default Input;
