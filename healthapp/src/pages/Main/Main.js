import React, { useRef, useState } from "react";
import styles from "./Main.module.css";
import GlowHeader from "../../components/GlowHeader/GlowHeader";
import { useHistory } from "react-router-dom";
import moment from "moment";
import LatestWorkout from "../../components/LatestWorkout";
import { timeState, dateWorkoutState } from "../../states";
import { useRecoilState } from "recoil";

import _ from "lodash";
import { db } from "../../index";

const Main = ({ user }) => {
  const dateRef = useRef("");
  const history = useHistory();
  const [dateWorkout, setDateWorkout] = useRecoilState(dateWorkoutState);

  const [time, setTime] = useRecoilState(timeState);
  const startWorkOut = () => {
    setTime({ ...time, startTime: moment() });
    history.push("/workout");
  };

  const getWorkoutData = async () => {
    const date = dateRef.current.value.replaceAll("-", "");
    if (date === "") return;

    var recordRef = await db.collection(user.email).doc(date);

    recordRef
      .get()
      .then(function (querySnapshot) {
        if (querySnapshot.exists) {
          const dateWorkoutData = [];
          const data = querySnapshot.data();

          for (let key of Object.keys(data)) {
            if (key === "order") continue;
            dateWorkoutData.push(JSON.parse(data[key]));
          }
          setDateWorkout(dateWorkoutData);
        } else {
          setDateWorkout([]);
        }
      })
      .catch(function (error) {
        console.log("Error getting document:", error);
      });

    history.push(`/records?date=${date}&email=${user?.email}`);
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
          <h2>Check Records</h2>
          <input
            ref={dateRef}
            type="date"
            className={styles.dateInput}
            max={moment().format("YYYY-MM-DD")}
            onChange={getWorkoutData}
          />
        </article>
        <article>
          <LatestWorkout user={user} dateWorkout={dateWorkout} />
        </article>
      </main>
    </div>
  );
};

export default Main;
