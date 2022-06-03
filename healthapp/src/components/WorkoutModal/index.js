import React from "react";
import styles from "./WorkoutModal.module.css";

const WorkoutModal = ({ modalOn, children, closeModal }) => {
  return (
    modalOn && (
      <div className={styles.safetyArea}>
        <div className={styles.modal}>{children}</div>{" "}
        <button className={styles.glowBtn} onClick={closeModal}></button>
      </div>
    )
  );
};

export default WorkoutModal;
