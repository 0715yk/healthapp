import React from "react";
import styles from "./Modal.module.css";

const Modal = ({ modalOn, closeModal }) => {
  return (
    modalOn.on && (
      <div className={styles.safetyArea}>
        <div className={styles.modal}>
          <section>{modalOn.message}</section>
          <button onClick={closeModal}>Confirm</button>
        </div>
      </div>
    )
  );
};

export default Modal;
