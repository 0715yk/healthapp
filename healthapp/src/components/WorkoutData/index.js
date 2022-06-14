import styles from "./WorkoutData.module.css";
import { useState } from "react";
import Modal from "../Modal/Modal";
import { db } from "../../index";
import { useRecoilState } from "recoil";
import { dateWorkoutState } from "../../states";
import _ from "lodash";

const WorkoutData = ({ fixMode, workout, idx, setFixModeFunc }) => {
  const [dateWorkout, setDateWorkout] = useRecoilState(dateWorkoutState);
  const [modalOn, setModalOn] = useState({
    on: false,
    message: "정말 삭제하시겠습니까?",
  });

  const closeModal = () => {
    fixWorkout();
    setModalOn((prev) => {
      return { ...prev, on: false };
    });
  };

  const deleteConfirm = () => {
    setModalOn((prev) => {
      return { ...prev, on: true };
    });
  };

  const fixWorkout = async () => {
    const queryString = window.location.search;
    const urlParams = new URLSearchParams(queryString);
    const email = urlParams.get("email");
    const date = urlParams.get("date");

    var batch = db.batch();
    let copyWorkout = _.cloneDeep(dateWorkout);
    const fbData = {};

    copyWorkout = copyWorkout.filter((el, _) => {
      if (_ === idx) return false;
      else return true;
    });

    for (let i = 0; i < copyWorkout.length; i++) {
      fbData[i] = JSON.stringify(copyWorkout[i]);
    }
    fbData.order = date;

    const recordRef = await db.collection(email).doc(date);
    await batch.set(recordRef, fbData);
    await batch.commit().then(() => {
      setDateWorkout(copyWorkout);
    });
  };

  return (
    <div style={{ marginTop: "20px" }}>
      <button className={styles.fixBtn} onClick={setFixModeFunc}>
        {fixMode ? "done" : `fix mode`}
      </button>
      <Modal modalOn={modalOn} closeModal={closeModal} />
      <div style={{ color: "gold", fontSize: "27px" }}>
        {`Workout Num : ${idx}`}
        {fixMode && (
          <i
            class="far fa-trash-alt"
            id={styles.deleteBtn}
            onClick={deleteConfirm}
          ></i>
        )}
      </div>
      {workout.map((el, workoutNameIdx) => {
        return (
          <div style={{ marginTop: "20px" }}>
            <div className={styles.workoutName}>
              {el[0].name}
              {fixMode && (
                <>
                  <i class="far fa-edit" id={styles.updateBtn}></i>
                  <i
                    class="far fa-trash-alt"
                    id={styles.deleteBtn}
                    onClick={deleteConfirm}
                  ></i>
                </>
              )}
            </div>
            {el.map((_, setIdx) => {
              return (
                <div className={styles.record}>
                  {`set ${_.set} : ${_.kg === null ? 0 : _.kg} kg x ${
                    _.reps === null ? 0 : _.reps
                  } reps`}
                  {fixMode && (
                    <>
                      <i class="far fa-edit" id={styles.fixBtn}></i>
                      <i
                        class="far fa-trash-alt"
                        id={styles.deleteBtn}
                        onClick={deleteConfirm}
                      ></i>
                    </>
                  )}
                </div>
              );
            })}
          </div>
        );
      })}
    </div>
  );
};

export default WorkoutData;
