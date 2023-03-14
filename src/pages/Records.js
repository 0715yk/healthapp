import React, { useEffect, useState } from "react";
import styles from "./Records.module.css";
import { useHistory } from "react-router-dom";

const Records = () => {
  const history = useHistory();

  const back = () => {
    history.push("/main");
  };

  return (
    <div className={styles.recordPage}>
      <header>
        <h2>Records</h2>
      </header>
      <button className={styles.glowBtn} onClick={back}></button>
      <main></main>
    </div>
  );
};

export default Records;
