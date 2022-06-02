import React from "react";
import styles from "./Main.module.css";
import GlowHeader from "../../components/GlowHeader/GlowHeader";
import { useHistory } from "react-router-dom";
import moment from "moment";
import LatestWorkout from "../../components/LatestWorkout";
import { startTimeState } from "../../states";
import { useRecoilState } from "recoil";

const Main = ({ user }) => {
  const [startTime, setStartTime] = useRecoilState(startTimeState);
  const history = useHistory();
  const startWorkOut = () => {
    setStartTime(moment());
    history.push("/workout");
  };
  const getRecords = () => {
    history.push("/records");
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
          <h2 onClick={getRecords}>Check Records</h2>
          <LatestWorkout user={user} />
        </article>
      </main>
    </div>
  );
};

export default Main;
