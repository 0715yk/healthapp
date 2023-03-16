import React, { useState } from "react";
import styles from "./WorkoutModal.module.css";
import WorkoutData from "../../components/WorkoutData";
import _ from "lodash";
import { useRecoilState } from "recoil";
import { dateWorkoutState } from "../../states";
import { useNavigate } from "react-router-dom";

const WorkoutModal = () => {
  const navigate = useNavigate();
  const [dateWorkout, setDateWorkout] = useRecoilState(dateWorkoutState);
  const [fixMode, setFixMode] = useState(false);

  const backBtn = () => {
    setDateWorkout([]);
    navigate("/main");
  };

  const setFixModeFunc = () => {
    setFixMode((prev) => !prev);
  };

  return (
    <div className={styles.safetyArea}>
      <div className={styles.modal}>
        {dateWorkout.length !== 0 ? (
          <section style={{ color: "#ffffff" }}>
            <section id={styles.workoutList}>
              {dateWorkout.map((workout, idx) => {
                return (
                  <WorkoutData
                    key={idx}
                    workout={workout}
                    idx={idx}
                    fixMode={fixMode}
                    setFixModeFunc={setFixModeFunc}
                  />
                );
              })}
            </section>
          </section>
        ) : (
          <div className={styles.emptyWorkout}>Empty Wortout Data</div>
        )}
      </div>
      <button className={styles.glowBtn} onClick={backBtn}></button>
    </div>
  );
};

export default React.memo(WorkoutModal);
