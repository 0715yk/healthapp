import styles from "./WorkoutName.module.css";
import React, { useEffect, useState } from "react";
import _ from "lodash";
import Modal from "../Modal/Modal";
import { customAxios } from "src/utils/axios";
import { recordWorkoutState } from "src/states";
import { useRecoilState } from "recoil";

const WorkoutName = ({ el, fixMode, idx, workoutNameIdx, date, datesId }) => {
  const [recordWorkout, setRecordWorkout] = useRecoilState(recordWorkoutState);
  const [workoutUpdateOn, setWorkoutUpdateOn] = useState(false);
  useEffect(() => {
    if (fixMode === false) {
      setWorkoutUpdateOn(false);
    }
  }, [fixMode]);
  const [inputValue, setInputValue] = useState(el?.workoutName);
  const [modalOn, setModalOn] = useState({
    on: false,
    message: "정말 삭제하시겠습니까?",
  });

  const [alertOn, setAlertOn] = useState({
    on: false,
    message: "한글자 이상의 단어로 작성해주세요.",
  });

  useEffect(() => {
    setInputValue(el?.workoutName);
    setWorkoutUpdateOn(false);
  }, [el]);

  // 운동 종목 제거 함수
  const deleteWorkoutName = async () => {
    const id = el.id;
    const workoutNumId = el.workoutNumId;

    try {
      const response = await customAxios.delete("workout/workoutName", {
        data: {
          id,
          workoutNumId,
          datesId,
        },
      });
      if (response.status === 200) {
        const resultArr = [];
        const copyWorkout = _.cloneDeep(recordWorkout);

        for (let i = 0; i < copyWorkout.length; i++) {
          let nowArr = null;
          if (i !== idx) nowArr = copyWorkout[i].workoutNames;
          else {
            nowArr = copyWorkout[i].workoutNames
              .slice(0, workoutNameIdx)
              .concat(copyWorkout[i].workoutNames.slice(workoutNameIdx + 1));
          }
          if (nowArr.length !== 0) {
            resultArr.push(nowArr);
          }
        }
        setRecordWorkout(resultArr);
      }
    } catch (err) {
      console.log(err);
      setModalOn({
        on: true,
        message: "서버 에러 입니다. 잠시후 다시 시도해주세요.",
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

    // const batch = db.batch();
    const copyWorkout = _.cloneDeep(recordWorkout);

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
    // const recordRef = await db.collection(email).doc(date);
    // await batch.set(recordRef, fbData);
    // await batch.commit().then(() => {
    //   setDateWorkout(resultArr);
    // });
    // setWorkoutUpdateOn(false);
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
    setInputValue(el?.workoutName);
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
        cancelModalOn={true}
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
      {el?.workoutName}
      <i
        class="far fa-edit"
        id={styles.updateBtn}
        onClick={() => {
          setWorkoutUpdateOn((prev) => !prev);
        }}
      ></i>
    </>
  );
  const workoutNameComponent = fixMode ? updateModeComponent : el?.workoutName;
  return <div className={styles.workoutName}>{workoutNameComponent}</div>;
};

export default WorkoutName;
// export default React.memo(WorkoutName, (prev, next) => {
//   const prevValue = prev.dateWorkout[prev.idx][prev.workoutNameIdx][0].name;
//   const nextValue = next.dateWorkout[next.idx][next.workoutNameIdx][0].name;

//   if (prev.fixMode !== next.fixMode) return false;
//   else if (prevValue !== nextValue) return false;
//   else return true;
// });
