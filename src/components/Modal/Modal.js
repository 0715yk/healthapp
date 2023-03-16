import React from "react";
import styles from "./Modal.module.css";

const Modal = ({
  modalOn,
  closeModal,
  cancelModalOn = false,
  cancelModal = () => {},
  btnOption = true,
}) => {
  return (
    modalOn.on && (
      <div className={styles.safetyArea}>
        <div className={styles.modal}>
          <section>{modalOn.message}</section>
          {btnOption && (
            <>
              <button onClick={closeModal}>Confirm</button>
              {cancelModalOn && <button onClick={cancelModal}>Cancel</button>}
            </>
          )}
        </div>
      </div>
    )
  );
};

export default Modal;
