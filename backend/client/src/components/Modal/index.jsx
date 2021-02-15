import React from "react";
import ReactDOM from "react-dom";
import Backdrop from "../Backdrop";
import { CSSTransition } from "react-transition-group";
import closeIcon from "../../assets/images/close.svg";
import style from "./index.module.scss";

const ModalOverlay = (props) => {
  const content = (
    <div className={style["modal"]} >
      <img src={closeIcon} alt="Cancel" className = {style["cancel"]} onClick = {props.toggleModal}/>
      <div className={style[`modal__content`]}>{props.children}</div>
    </div>
  );

  return ReactDOM.createPortal(content, document.getElementById("modal-hook"));
};

const Modal = (props) => {
  return (
    <>
      {props.isOpen ? <Backdrop onClick={props.toggleModal}></Backdrop> : ""}

      <CSSTransition
        in={props.isOpen}
        mountOnEnter
        unmountOnExit
        timeout={50}
        classNames="modal"
      >
        <ModalOverlay {...props}></ModalOverlay>
      </CSSTransition>
    </>
  );
};

export default Modal;
