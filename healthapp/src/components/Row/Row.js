import React, { useEffect, useState, useRef } from "react";
import styles from "./Row.module.css";

const Row = ({
  keyIdx,
  el,
  workout,
  workouts,
  checkList,
  setWorkouts,
  setCheckList,
}) => {
  const [btnType, setBtnType] = useState("clear");
  const kgRef = useRef();
  const repsRef = useRef();

  const clearRow = (workout, set) => {
    const copyObj = Object.assign(checkList);
    copyObj[workout][set - 1].kg = kgRef.current.value;
    copyObj[workout][set - 1].reps = repsRef.current.value;
    const copyArr = workouts.slice();
    setCheckList(copyObj);
    setWorkouts(copyArr);

    if (btnType === "clear") {
      setBtnType("fix");
      kgRef.current.disabled = true;
      repsRef.current.disabled = true;
    } else {
      setBtnType("clear");
      kgRef.current.disabled = false;
      repsRef.current.disabled = false;
    }
  };

  const deleteRow = (workout, set) => {
    const copyObj = Object.assign(checkList);
    let cnt = 1;
    copyObj[workout] = copyObj[workout].filter((el) => {
      if (el.set !== set) {
        el.set = cnt;
        cnt++;
        return true;
      } else return false;
    });
    const copyArr = workouts.slice();
    setWorkouts(copyArr);
    setCheckList(copyObj);
  };

  return (
    <div className={styles.rowInput} key={keyIdx}>
      <div>{`set ${el.set}`}</div>
      <div id={styles.kgInput}>
        kg :<input ref={kgRef} type="number" />
      </div>
      <div id={styles.repsInput}>
        reps :<input ref={repsRef} type="number" />
      </div>
      <button
        onClick={() => {
          clearRow(workout, el.set);
        }}
      >
        {btnType}
      </button>
      {btnType === "fix" ? (
        <span
          id={styles.xBtn}
          onClick={() => {
            deleteRow(workout, el.set);
          }}
        >
          X
        </span>
      ) : null}
    </div>
  );
};

export default Row;
