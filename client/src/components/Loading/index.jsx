import React from "react";
import ReactDOM from "react-dom";
import Backdrop from "../Backdrop";
import { CSSTransition } from "react-transition-group";
import style from "./index.module.scss";

const LoadingOverlay = (props) => {
  const content = (
    <div className={style["loader"]} >
      <div className={style[`loader__content`]}>{props.children}</div>
    </div>
  );

  return ReactDOM.createPortal(content, document.getElementById("modal-hook"));
};

const Loader = (props) => {
  return (
    <>
      {props.isOpen ? <Backdrop onClick={props.toggleLoader}></Backdrop> : ""}

      <CSSTransition
        in={props.isOpen}
        mountOnEnter
        unmountOnExit
        timeout={50}
        classNames="loader"
      >
        <LoadingOverlay {...props}></LoadingOverlay>
      </CSSTransition>
    </>
  );
};

export default Loader;
