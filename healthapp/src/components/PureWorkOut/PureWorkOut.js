import React, { useState, useRef } from "react";
import styles from "./PureWorkOut.module.css";
import Row from "../Row/Row";

const PureWorkOut = ({ workout, idx, checkList, setCheckList }) => {
  const [fixMode, setFixMode] = useState(false);
  const titleRef = useRef();
  const addSet = (workout) => {
    const copyObj = Object.assign({}, checkList);
    try {
      copyObj[workout].push({
        set: copyObj[workout][copyObj[workout].length - 1].set + 1,
        reps: null,
        kg: null,
        done: false,
      });
    } catch {
      copyObj[workout].push({
        set: 1,
        reps: null,
        kg: null,
        done: false,
      });
    }

    setCheckList(copyObj);
  };

  const fixTitle = () => {
    if (fixMode) {
      if (
        titleRef.current.value.replace(/ /g, "") === workout.replace(/ /g, "")
      ) {
        setFixMode(false);
        return;
      }

      setFixMode(false);
      const copyObj = Object.assign({}, checkList);
      copyObj[titleRef.current.value] = copyObj[workout];
      delete copyObj[workout];
      setCheckList(copyObj);
    } else {
      setFixMode(true);
      setTimeout(() => {
        titleRef.current.value = workout;
        titleRef.current.focus();
      });
    }
  };

  const deleteWorkout = () => {
    const copyObj = Object.assign({}, checkList);
    delete copyObj[workout];
    setCheckList(copyObj);
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") fixTitle();
  };

  return (
    <>
      <div className={styles.title}>
        {fixMode ? <input ref={titleRef} onKeyDown={handleKeyDown} /> : workout}
        <i class="far fa-edit" id={styles.fixBtn} onClick={fixTitle}></i>
        <i
          class="far fa-trash-alt"
          id={styles.deleteBtn}
          onClick={deleteWorkout}
        ></i>
      </div>
      <div className={styles.rows} key={idx}>
        {checkList[workout].map((el, keyIdx) => {
          return (
            <Row
              keyIdx={keyIdx}
              el={el}
              workout={workout}
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
};

export default PureWorkOut;
