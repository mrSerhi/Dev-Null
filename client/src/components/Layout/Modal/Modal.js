import React from "react";
import ReactModal from "react-modal";
import classes from "./Modal.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import PropTypes from "prop-types";

ReactModal.setAppElement(document.getElementById("root"));

const Modal = ({ isOpen, onClose, ...props }) => {
  return (
    <ReactModal
      isOpen={isOpen}
      onRequestClose={onClose}
      overlayClassName={classes.Overlay}
      className={classes.Modal}
      closeTimeoutMS={500}
    >
      <button
        type="button"
        onClick={onClose}
        className="close float-right"
        aria-label="Close"
      >
        <FontAwesomeIcon icon="times" />
      </button>

      {props.children}
    </ReactModal>
  );
};

Modal.defaultProps = {
  shouldCloseOnEsc: true
};

Modal.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired
};

export default Modal;
