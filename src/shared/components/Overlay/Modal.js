import React from "react";
import ReactDOM from "react-dom";
import { CSSTransition } from "react-transition-group";
import Alert from '@mui/material/Alert';

import Backdrop from "./Backdrop";
import "./Modal.css";

const ModalOverlay = (props) => {
  let content = <div className="modal">
      <div className ="upper-modal">
        <h2 className ="modal-header">{props.header}</h2>
      </div>
        {props.children}
  </div>;

  if (props.contact) {
    if (props.status) {
      content = (<div className = "contact-modal">
                  <Alert severity="success">{props.message}</Alert>
                 </div>)
    }else {
      content = (<div className = "contact-modal"><Alert severity="error">{props.message}</Alert></div>)
    }
  }

  return ReactDOM.createPortal(content, document.getElementById("modal-hook"));
};

const Modal = (props) => {
  if (props.contact) {
    return (
      <React.Fragment>
        <CSSTransition
          in={props.show}
          mountOnEnter
          unmountOnExit
          timeout={600}
          classNames="contact-status"
        >
          <ModalOverlay {...props} />
        </CSSTransition>
      </React.Fragment>
    );
  }

  return (
    <React.Fragment>
      {props.show && <Backdrop onClick={props.onCancel} />}
      <CSSTransition
        in={props.show}
        mountOnEnter
        unmountOnExit
        timeout={500}
        classNames="modal"
      >
        <ModalOverlay {...props} />
      </CSSTransition>
    </React.Fragment>
  );
};

export default Modal;
