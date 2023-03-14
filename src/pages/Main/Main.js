import React, { useEffect, useState } from "react";
import styles from "./Main.module.css";
import GlowHeader from "../../components/GlowHeader/GlowHeader";

import { useHistory } from "react-router-dom";
import moment from "moment";
import LatestWorkout from "../../components/LatestWorkout";
import { timeState, dateWorkoutState } from "../../states";
import { useRecoilState } from "recoil";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import _ from "lodash";
import { db } from "../../index";
import GlowBtnLogout from "../../components/GlowBtnLogout";

const Main = ({ user }) => {
  const history = useHistory();
  const [selectedDate, setSelectedDate] = useState(null);
  const [dateWorkout, setDateWorkout] = useRecoilState(dateWorkoutState);
  const [time, setTime] = useRecoilState(timeState);
  const startWorkOut = () => {
    setTime({ ...time, startTime: moment() });
    history.push("/workout");
  };

  useEffect(() => {
    setSelectedDate(null);
  }, []);

  const getWorkoutData = async (selectedDate) => {
    const date = moment(selectedDate).format("YYYYMMDD");
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
  const DatepickerInput = ({ ...props }) => (
    <input type="text" {...props} readOnly />
  );

  return (
    <div className={styles.mainPage}>
      <GlowBtnLogout
        props={{
          func: () => history.push("/"),
        }}
      />
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
          <button className={styles.strtBtn} onClick={startWorkOut}>
            Start an Empty Workout
          </button>
        </article>
        <article>
          <h2>Check Records</h2>
          <DatePicker
            className={styles.dateInput}
            onChange={getWorkoutData}
            maxDate={new Date()}
            selected={selectedDate}
            placeholderText={"Please select a date"}
            onChangeRaw={(e) => e.preventDefault()}
            withPortal
            customInput={<DatepickerInput />}
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
