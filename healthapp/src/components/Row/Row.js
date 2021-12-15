import React, { useState, useRef } from "react";
import styles from "./Row.module.css";

const Row = ({ keyIdx, el, workout, checkList, setCheckList }) => {
  const kgRef = useRef();
  const repsRef = useRef();

  const clearRow = (workout, set) => {
    const copyObj = Object.assign({}, checkList);
    if (!copyObj[workout][set - 1].done) {
      copyObj[workout][set - 1].kg =
        kgRef.current.value === "" ? 0 : kgRef.current.value;
      copyObj[workout][set - 1].reps =
        repsRef.current.value === "" ? 0 : repsRef.current.value;
      copyObj[workout][set - 1].done = true;
    } else {
      copyObj[workout][set - 1].done = false;
      setTimeout(() => {
        kgRef.current.value = copyObj[workout][set - 1].kg;
        repsRef.current.value = copyObj[workout][set - 1].reps;
      });
    }

    setCheckList(copyObj);
  };

  const deleteRow = (workout, set) => {
    const copyObj = Object.assign({}, checkList);
    let cnt = 1;
    copyObj[workout] = copyObj[workout].filter((el) => {
      if (el.set !== set) {
        el.set = cnt;
        cnt++;
        return true;
      } else return false;
    });

    setCheckList(copyObj);
  };

  return (
    <div className={styles.rowInput} key={keyIdx}>
      <div>{`set ${el.set}`}</div>
      <div id={styles.kgInput}>
        kg : {el.done ? el.kg : <input ref={kgRef} type="number" />}
      </div>
      <div id={styles.repsInput}>
        reps : {el.done ? el.reps : <input ref={repsRef} type="number" />}
      </div>
      <button
        onClick={() => {
          clearRow(workout, el.set);
        }}
      >
        {el.done ? "fix" : "clear"}
      </button>
      {el.done ? (
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
