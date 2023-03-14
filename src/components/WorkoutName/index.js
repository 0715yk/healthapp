import styles from "./WorkoutName.module.css";
import React, { useEffect, useState } from "react";
import { db } from "../../index";
import _ from "lodash";
import Modal from "../Modal/Modal";

const WorkoutName = ({
  el,
  fixMode,
  idx,
  workoutNameIdx,
  dateWorkout,
  setDateWorkout,
  email,
  date,
}) => {
  const [workoutUpdateOn, setWorkoutUpdateOn] = useState(false);
  useEffect(() => {
    if (fixMode === false) {
      setWorkoutUpdateOn(false);
    }
  }, [fixMode]);
  const [inputValue, setInputValue] = useState(el[0].name);
  const [modalOn, setModalOn] = useState({
    on: false,
    message: "정말 삭제하시겠습니까?",
  });

  const [alertOn, setAlertOn] = useState({
    on: false,
    message: "한글자 이상의 단어로 작성해주세요.",
  });

  useEffect(() => {
    setInputValue(el[0].name);
    setWorkoutUpdateOn(false);
  }, [el]);

  // 운동 종목 제거 함수
  const deleteWorkoutName = async () => {
    const batch = db.batch();
    const copyWorkout = _.cloneDeep(dateWorkout);

    const fbData = {};
    const resultArr = [];

    let key = 0;

    for (let i = 0; i < copyWorkout.length; i++) {
      let nowArr = null;
      if (i !== idx) nowArr = copyWorkout[i];
      else {
        nowArr = copyWorkout[i]
          .slice(0, workoutNameIdx)
          .concat(copyWorkout[i].slice(workoutNameIdx + 1));
      }

      if (nowArr.length !== 0) {
        fbData[key] = JSON.stringify(nowArr);
        resultArr.push(nowArr);
        key++;
      }
    }

    fbData.order = date;
    const recordRef = await db.collection(email).doc(date);

    if (resultArr.length === 0) {
      recordRef
        .delete()
        .then(() => {
          setDateWorkout(resultArr);
        })
        .catch((error) => {
          console.error("Error removing document: ", error);
        });
    } else {
      await batch.set(recordRef, fbData);
      await batch.commit().then(() => {
        setDateWorkout(resultArr);
      });
    }
  };

  const updateWorkoutName = async () => {
    if (el[0].name === inputValue) {
      setWorkoutUpdateOn(false);
      return;
    } else if (inputValue.replace(/ /g, "").length === 0) {
      setAlertOn((prev) => ({
        ...prev,
        on: true,
      }));
      return;
    }

    const batch = db.batch();
    const copyWorkout = _.cloneDeep(dateWorkout);

    const fbData = {};
    const resultArr = [];

    let key = 0;
    for (let i = 0; i < copyWorkout.length; i++) {
      let nowArr = null;
      if (i !== idx) nowArr = copyWorkout[i];
      else {
        nowArr = copyWorkout[i].map((arr, _) => {
          if (_ === workoutNameIdx) {
            return arr.map((el) => {
              el.name = inputValue;
              return el;
            });
          } else return arr;
        });
      }

      if (nowArr.length !== 0) {
        fbData[key] = JSON.stringify(nowArr);
        resultArr.push(nowArr);
        key++;
      }
    }

    fbData.order = date;
    const recordRef = await db.collection(email).doc(date);
    await batch.set(recordRef, fbData);
    await batch.commit().then(() => {
      setDateWorkout(resultArr);
    });
    setWorkoutUpdateOn(false);
  };

  const closeModal = () => {
    deleteWorkoutName();
    setModalOn((prev) => {
      return { ...prev, on: false };
    });
  };

  const setModalOnFunc = () => {
    setModalOn((prev) => {
      return { ...prev, on: !prev.on };
    });
  };

  const xBtnFunc = () => {
    setInputValue(el[0].name);
    setWorkoutUpdateOn((prev) => !prev);
  };

  const alertModal = () => {
    setAlertOn((prev) => ({ ...prev, on: false }));
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") updateWorkoutName();
  };

  const updateModeComponent = workoutUpdateOn ? (
    <div className={styles.updatePart}>
      <Modal modalOn={alertOn} closeModal={alertModal} />
      <Modal
        modalOn={modalOn}
        closeModal={closeModal}
        cancelModal={setModalOnFunc}
      />
      <input
        className={styles.workoutNameInput}
        value={inputValue}
        onChange={(e) => setInputValue(e.target.value)}
        spellCheck={false}
        onKeyDown={handleKeyDown}
      />
      <i
        className="far fa-edit"
        id={styles.updateBtn}
        onClick={updateWorkoutName}
      ></i>
      <i
        className="far fa-trash-alt"
        id={styles.deleteBtn}
        onClick={setModalOnFunc}
      ></i>
      <div className={styles.xBtn} onClick={xBtnFunc}>
        X
      </div>
    </div>
  ) : (
    <>
      {el[0]?.name}
      <i
        class="far fa-edit"
        id={styles.updateBtn}
        onClick={() => {
          setWorkoutUpdateOn((prev) => !prev);
        }}
      ></i>
    </>
  );
  const workoutNameComponent = fixMode ? updateModeComponent : el[0]?.name;
  return <div className={styles.workoutName}>{workoutNameComponent}</div>;
};

export default React.memo(WorkoutName, (prev, next) => {
  const prevValue = prev.dateWorkout[prev.idx][prev.workoutNameIdx][0].name;
  const nextValue = next.dateWorkout[next.idx][next.workoutNameIdx][0].name;

  if (prev.fixMode !== next.fixMode) return false;
  else if (prevValue !== nextValue) return false;
  else return true;
});
