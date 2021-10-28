import React from 'react';
import style from './index.module.scss';
import Button from '../Button';
import Modal from "../../components/Modal";

const ShareModal = ({ isOpen, handleToggle }) => {
    return (
      <Modal isOpen={isOpen} toggleModal={handleToggle}>
        <span style={{ fontSize: "30px" }}>🥺</span>
        <h3>Was Mediumreader useful ?</h3>
        <div className={style["share__container"]}>
          <a
            href="https://twitter.com/intent/tweet?text=🎧%20LISTEN%20to%20your%20favourite%20blogposts%20https://mediumreader.herokuapp.com"
            target="blank"
          >
            <Button className="twitter">
              Share on Twitter <i className="bx bxl-twitter"></i>
            </Button>
          </a>
          <a
            href="https://github.com/rexsimiloluwah/mediumreaderv2"
            target="blank"
          >
            <Button className="github">
              Star on Github <i className="bx bxl-github"></i>
            </Button>
          </a>
          <a
            href="https://docs.google.com/forms/d/e/1FAIpQLScsFEyONgsCKnOo8Oyr5AJpyExdTgqGrrrVejR1QuywHUvJbA/viewform?usp=sf_link"
            target="blank"
          >
            <Button className="feedback">
              Submit Feedback <i className="bx bx-mail-send"></i>
            </Button>
          </a>
        </div>
      </Modal>
    );
  };

  export default ShareModal;
  