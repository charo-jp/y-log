import React, { useState, useCallback, useEffect } from "react";
import RichText from "../../../shared/components/RichText";
import Button from "../../../shared/components/UIElements/Button";
import Input from "../../../shared/components/Input";
import useForm from "../../../shared/hooks/form-hook";
import { useHttpClient } from "../../../shared/hooks/http-hook";
import Loading from "../../../shared/components/Loading";
import Modal from "../../../shared/components/Overlay/Modal";
import "./Contact.css";

const Contact = () => {
  const { isLoading, error, sendRequest } = useHttpClient();
  const [reset, setReset] = useState(false);
  const [showStatus, setshowStatus] = useState({show: false, status: false, message: ""});
  const resetFalseHandler = useCallback(() => {
    setReset(false);
  });

  const initialContact = {
    name: {
      value: "",
      isValid: false,
    },
    email: {
      value: "",
      isValid: false,
    },
    title: {
      value: "",
      isValid: false,
    },
    message: {
      value: "",
      isValid: false,
    },
  };
  const [formState, inputHandler] = useForm(initialContact, false);

  const submitHandler = async (event) => {
    event.preventDefault();

    try {
      await sendRequest(
        `${process.env.REACT_APP_BACKEND_URL}/contact`,
        "POST",
        JSON.stringify({
          name: formState.inputs.name.value,
          email: formState.inputs.email.value,
          title: formState.inputs.title.value,
          message: formState.inputs.message.value,
        }),
        { "Content-Type": "application/json" }
      );
      setReset(true);
      setshowStatus({show: true,status: true, message: "Your Message Sent Successfully!"});
    } catch (err) {
      setshowStatus({show: true, status: false, message: "Could not send your message. Please try again."});
      console.log(error);
    }
  };


  useEffect(() => {
    const timeId = setTimeout(() => {
      if (showStatus.show === true){
        setshowStatus(prev => {
          return {...prev,
            show: false
          }
        })
      }
    }, 2000)
    return (() => {
      clearTimeout(timeId)
    })
  }, [showStatus]);

  return (
    <div className="contact">
      <h2 className="contact-title">🐶Say Hello to Charo and me!🐶</h2>
      {isLoading && <Loading />}
      <Modal show = {showStatus.show} contact = {true} status={showStatus.status} message = {showStatus.message} />
      <form onSubmit={submitHandler} className="form">
        <div className="form-component form-name">
          <label
            className="label"
            htmlFor="name"
            style={{ color: formState.inputs.name.isValid ? "#039487" : "" }}
          >
            Name <span className="required">*</span>
          </label>
          <Input
            tag="input"
            placeholderAndId="name"
            type="text"
            onInput={inputHandler}
            reset={reset}
            resetFalseHandler={resetFalseHandler}
          />
        </div>
        <div className="form-component form-email">
          <label
            className="label"
            htmlFor="email"
            style={{ color: formState.inputs.email.isValid ? "#039487" : "" }}
          >
            Email <span className="required">*</span>
          </label>
          <Input
            tag="input"
            placeholderAndId="email"
            type="email"
            onInput={inputHandler}
            reset={reset}
            resetFalseHandler={resetFalseHandler}
          />
        </div>
        <div className="form-component form-title">
          <label
            className="label"
            htmlFor="title"
            style={{ color: formState.inputs.title.isValid ? "#039487" : "" }}
          >
            Title <span className="required">*</span>
          </label>
          <Input
            tag="input"
            placeholderAndId="title"
            type="text"
            onInput={inputHandler}
            reset={reset}
            resetFalseHandler={resetFalseHandler}
          />
        </div>
        <div className="form-component form-message">
          <label
            className="label"
            htmlFor="message"
            style={{ color: formState.inputs.message.isValid ? "#039487" : "" }}
          >
            Message <span className="required">*</span>
          </label>
          <RichText 
            placeholderAndId = "message"
            onInput = {inputHandler}
            reset = {reset}
            resetFalseHandler = {resetFalseHandler}
          />
        </div>
        <div className="button-container">
          <Button type="contact" />
        </div>
      </form>
    </div>
  );
};

export default Contact;
