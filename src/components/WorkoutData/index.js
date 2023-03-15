import styles from "./WorkoutData.module.css";
import React, { useState } from "react";
import Modal from "../Modal/Modal";
import { useRecoilState } from "recoil";
import { dateWorkoutState } from "../../states";
import WorkoutName from "../WorkoutName";
import WorkoutSet from "../WorkoutSet";
import _ from "lodash";

const WorkoutData = ({ fixMode, workout, idx, setFixModeFunc }) => {
  const [dateWorkout, setDateWorkout] = useRecoilState(dateWorkoutState);
  const [modalOn, setModalOn] = useState({
    on: false,
    message: "정말 삭제하시겠습니까?",
  });

  const queryString = window.location.search;
  const urlParams = new URLSearchParams(queryString);
  const email = urlParams.get("email");
  const date = urlParams.get("date");

  // workout 제거 함수
  const deleteWorkout = async () => {
    // var batch = db.batch();
    // let copyWorkout = _.cloneDeep(dateWorkout);
    // const fbData = {};
    // copyWorkout = copyWorkout.filter((el, _) => {
    //   if (_ === idx) return false;
    //   else return true;
    // });
    // for (let i = 0; i < copyWorkout.length; i++) {
    //   fbData[i] = JSON.stringify(copyWorkout[i]);
    // }
    // fbData.order = date;
    // const recordRef = await db.collection(email).doc(date);
    // if (copyWorkout.length === 0) {
    //   recordRef
    //     .delete()
    //     .then(() => {
    //       setDateWorkout(copyWorkout);
    //     })
    //     .catch((error) => {
    //       console.error("Error removing document: ", error);
    //     });
    // } else {
    //   await batch.set(recordRef, fbData);
    //   await batch.commit().then(() => {
    //     setDateWorkout(copyWorkout);
    //   });
    // }
  };

  // set 제거 함수

  const closeModal = () => {
    deleteWorkout();
    setModalOn((prev) => {
      return { ...prev, on: false };
    });
  };

  const setModalOnFunc = () => {
    setModalOn((prev) => {
      return { ...prev, on: !prev.on };
    });
  };

  return (
    <div style={{ marginTop: "20px" }}>
      <button className={styles.fixBtn} onClick={setFixModeFunc}>
        {fixMode ? "Done" : `Fix mode`}
      </button>
      <Modal
        modalOn={modalOn}
        closeModal={closeModal}
        cancelModal={setModalOnFunc}
      />
      <div style={{ color: "gold", fontSize: "27px" }}>
        {`Workout Num : ${idx}`}
        {fixMode && (
          <i
            class="far fa-trash-alt"
            id={styles.deleteBtn}
            onClick={setModalOnFunc}
          ></i>
        )}
      </div>

      {workout.map((el, workoutNameIdx) => {
        return (
          <>
            <WorkoutName
              key={workoutNameIdx}
              el={el}
              fixMode={fixMode}
              idx={idx}
              workoutNameIdx={workoutNameIdx}
              dateWorkout={dateWorkout}
              setDateWorkout={setDateWorkout}
              date={date}
              email={email}
            />
            <div style={{ marginTop: "20px" }}>
              {el.map((_, setIdx) => {
                return (
                  <WorkoutSet
                    key={setIdx}
                    el={_}
                    setIdx={setIdx}
                    fixMode={fixMode}
                    dateWorkout={dateWorkout}
                    setDateWorkout={setDateWorkout}
                    idx={idx}
                    workoutNameIdx={workoutNameIdx}
                    date={date}
                    email={email}
                  />
                );
              })}
            </div>
          </>
        );
      })}
    </div>
  );
};

export default React.memo(WorkoutData);
