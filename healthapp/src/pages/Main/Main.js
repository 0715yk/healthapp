import React from "react";
import styles from "./Main.module.css";
import GlowHeader from "../../components/GlowHeader/GlowHeader";
import { useHistory } from "react-router-dom";
import moment from "moment";

const Main = ({ setStartTime }) => {
  const history = useHistory();
  const startWorkOut = () => {
    setStartTime(moment().format("HH:mm"));
    history.push("/workout");
  };

  return (
    <div className={styles.mainPage}>
      <GlowHeader
        title={"Start Workout"}
        style={{
          fontSize: "13vw",
          textAlign: "left",
          marginLeft: "15px",
        }}
      />
      <main>
        <article>
          <h2>Quick Start</h2>
          <button onClick={startWorkOut}>Start an Empty Workout</button>
        </article>
        <article>
          <h2>My Templates</h2>
          <section>
            <div
              onClick={() => {
                history.push("/records");
              }}
            ></div>
            <div></div>
            <div></div>
            <div></div>
            <div></div>
            <div></div>
            <div></div>
            <div></div>
          </section>
        </article>
      </main>
    </div>
  );
};

export default Main;
