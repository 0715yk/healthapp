import React, { useEffect, useState } from "react";
import styles from "./Main.module.css";
import GlowHeader from "../../components/GlowHeader/GlowHeader";
import moment from "moment";
import LatestWorkout from "../../components/LatestWorkout";
import { timeState, dateWorkoutState } from "../../states";
import { useRecoilState, useRecoilValue } from "recoil";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import _ from "lodash";
import GlowBtnLogout from "../../components/GlowBtnLogout";
import { Route, Routes, useNavigate } from "react-router-dom";
import Record from "../Record";
import WorkOut from "../WorkOut/WorkOut";
import WorkoutModal from "../../components/WorkoutModal";
import useCheckToken from "src/hooks/useCheckToken";

const Main = ({ user }) => {
  const navigate = useNavigate();
  const [selectedDate, setSelectedDate] = useState(null);
  const dateWorkout = useRecoilValue(dateWorkoutState);
  const [time, setTime] = useRecoilState(timeState);
  const startWorkOut = () => {
    setTime({ ...time, startTime: moment() });
    navigate("/main/workout");
  };

  useCheckToken();

  useEffect(() => {
    setSelectedDate(null);
  }, []);

  const getWorkoutData = async (selectedDate) => {
    // 특정 날짜 값을 받고, 쿼리로 조회
    const date = moment(selectedDate).format("YYYYMMDD");
    if (date === "") return;

    // 조회한 뒤에는 날짜와 id 값을 통해 데이터를 조회(운동 기록)
    navigate(`/main/records?date=${date}&email=${user?.email}`);
  };
  const DatepickerInput = ({ ...props }) => (
    <input type="text" {...props} readOnly />
  );

  const Main = () => {
    return (
      <div className={styles.mainPage}>
        <GlowBtnLogout
          props={{
            func: () => navigate("/"),
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
  return (
    <Routes>
      <Route path="" element={<Main />} />
      <Route path="record" element={<Record />} />
      <Route path="records" element={<WorkoutModal />} />
      <Route path="workout" element={<WorkOut />} />
    </Routes>
  );
};

export default Main;
