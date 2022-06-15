import React from "react";
import styles from "./Modal.module.css";

const Modal = ({ modalOn, closeModal, cancelModal = false }) => {
  return (
    modalOn.on && (
      <div className={styles.safetyArea}>
        <div className={styles.modal}>
          <section>{modalOn.message}</section>
          <button onClick={closeModal}>Confirm</button>
          {cancelModal && <button onClick={cancelModal}>Cancel</button>}
        </div>
      </div>
    )
  );
};

export default Modal;
