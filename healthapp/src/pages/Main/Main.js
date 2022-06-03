import React, { useRef, useState } from "react";
import styles from "./Main.module.css";
import GlowHeader from "../../components/GlowHeader/GlowHeader";
import { useHistory } from "react-router-dom";
import moment from "moment";
import LatestWorkout from "../../components/LatestWorkout";
import { timeState, allWorkoutState } from "../../states";
import { useRecoilState, useRecoilValue } from "recoil";
import WorkoutModal from "../../components/WorkoutModal";

const Main = ({ user }) => {
  const dateRef = useRef("");
  const history = useHistory();
  const allWorkouts = useRecoilValue(allWorkoutState);
  const [dateWorkout, setDateWorkout] = useState([]);
  const [modalOn, setModalOn] = useState(false);
  const [time, setTime] = useRecoilState(timeState);
  const startWorkOut = () => {
    setTime({ ...time, startTime: moment() });
    history.push("/workout");
  };

  const getRecords = () => {
    history.push("/records");
  };

  const getWorkoutData = () => {
    if (dateRef.current.value.replaceAll("-", "/") === "") return;
    const workoutData =
      allWorkouts[dateRef.current.value.replaceAll("-", "/")] || [];

    setModalOn(true);
    setDateWorkout(workoutData);
  };

  const closeModal = () => {
    setModalOn(false);
  };

  return (
    <div className={styles.mainPage}>
      <WorkoutModal modalOn={modalOn} closeModal={closeModal}>
        {dateWorkout.length !== 0 ? (
          <section style={{ color: "#ffffff" }}>
            <section id={styles.workoutList}>
              {dateWorkout.map((workout, idx) => {
                workout = JSON.parse(workout);
                return (
                  <div style={{ marginTop: "20px" }}>
                    <div
                      style={{ color: "gold", fontSize: "25px" }}
                    >{`Workout Num : ${idx}`}</div>
                    {workout.map((el) => {
                      return (
                        <div style={{ marginTop: "20px" }}>
                          <div
                            style={{ marginBottom: "15px", fontSize: "20px" }}
                          >
                            {el[0].name}
                          </div>
                          {el.map((_) => {
                            return (
                              <div className={styles.record}>{`set ${_.set} : ${
                                _.kg === null ? 0 : _.kg
                              } kg x ${
                                _.reps === null ? 0 : _.reps
                              } reps`}</div>
                            );
                          })}
                        </div>
                      );
                    })}
                  </div>
                );
              })}
            </section>
          </section>
        ) : (
          <div className={styles.emptyWorkout}>Empty Wortout Data</div>
        )}
      </WorkoutModal>
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
          <LatestWorkout user={user} />
        </article>
      </main>
    </div>
  );
};

export default Main;
