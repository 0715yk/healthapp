import React, { useState } from "react";
import styles from "./WriteFunc.module.css";
import { useHistory } from "react-router-dom";
import Row from "../Row/Row";

const WriteFunc = ({ workouts, setWorkouts, checkList, setCheckList }) => {
  const finishWorkout = () => {};

  const addSet = (workout) => {
    const copyObj = Object.assign(checkList);
    try {
      copyObj[workout].push({
        set: copyObj[workout][copyObj[workout].length - 1].set + 1,
        reps: null,
        kg: null,
      });
    } catch {
      copyObj[workout].push({
        set: 1,
        reps: null,
        kg: null,
      });
    }
    const copyArr = workouts.slice();
    setCheckList(copyObj);
    setWorkouts(copyArr);
  };

  return (
    <div className={styles.writeFunc}>
      <main>
        <section>
          {workouts.map((workout, idx) => {
            return (
              <>
                <div className={styles.title}>{workout}</div>
                <div className={styles.rows} key={idx}>
                  {checkList[workout].map((el, keyIdx) => {
                    return (
                      <Row
                        keyIdx={keyIdx}
                        el={el}
                        setWorkouts={setWorkouts}
                        workout={workout}
                        workouts={workouts}
                        checkList={checkList}
                        setCheckList={setCheckList}
                      />
                    );
                  })}
                  <button id={styles.addBtn} onClick={() => addSet(workout)}>
                    +
                  </button>
                </div>
              </>
            );
          })}
        </section>
        <section className={styles.doneBtnPart}>
          <button className={styles.glowBtn} onClick={finishWorkout}></button>
        </section>
      </main>
    </div>
  );
};

export default WriteFunc;
