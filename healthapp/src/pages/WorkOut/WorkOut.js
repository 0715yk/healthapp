import React, { useState, useRef } from "react";
import styles from "./WorkOut.module.css";
import TimeLapse from "../../components/TimeLapse";
import WriteFunc from "../../components/WriteFunc/WriteFunc";

const WorkOut = ({ checkList, setCheckList }) => {
  const [workouts, setWorkouts] = useState([]);
  const [workout, setWorkout] = useState("");
  const selectRef = useRef(null);
  const inputRef = useRef(null);
  const workoutNames = [
    "pull up",
    "lat pulldown",
    "deadlift",
    "seated row",
    "back extension",
    "push up",
    "bench press",
    "incline press",
    "decline press",
    "dumbbell chest press",
    "dips",
    "squat",
    "leg extension",
    "leg curl",
    "lunge",
    "dumbbell curl",
    "shoulder press",
    "military press",
    "Side Lateral Raise",
    "front Raise",
  ];

  const getNormalInput = (e) => {
    setWorkout(e.target.value);
    selectRef.current.value = null;
    if (e.keyCode === 13) {
      registerWorkout();
    }
  };

  const getSelectInput = (e) => {
    const workout = e.target.value;
    setWorkout(workout);
    inputRef.current.value = null;
  };

  const registerWorkout = () => {
    const copyArr = workouts.slice();
    if (copyArr.includes(workout)) {
      alert("already taken");
      return;
    }

    copyArr.push(workout);
    const copyObj = Object.assign(checkList, {});
    if (!copyObj[workout])
      copyObj[workout] = [{ set: 1, kg: null, reps: null }];
    setCheckList(copyObj);
    setWorkouts(copyArr);

    inputRef.current.value = null;
    selectRef.current.value = "choose basic workout";
  };

  return (
    <div className={styles.workoutPage}>
      <main>
        <TimeLapse />
        <article className={styles.registerArea}>
          <div className={styles.inputArea}>
            <input
              placeholder="direct input"
              onKeyDown={getNormalInput}
              ref={inputRef}
              className={styles.directInput}
              onChange={getNormalInput}
            />
            <select
              ref={selectRef}
              className={styles.indirectInput}
              onChange={getSelectInput}
              defaultValue="choose basic workout"
            >
              <option disabled>choose basic workout</option>
              {workoutNames.map((name) => (
                <option>{name}</option>
              ))}
            </select>
          </div>
          <button className={styles.btnArea} onClick={registerWorkout}>
            +
          </button>
        </article>
        <button id={styles.cacelBtn}>Cancel Workout</button>
        <WriteFunc
          setWorkouts={setWorkouts}
          workouts={workouts}
          checkList={checkList}
          setCheckList={setCheckList}
        />
      </main>
    </div>
  );
};

export default WorkOut;
