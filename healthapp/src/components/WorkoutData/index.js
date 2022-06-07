import styles from "./WorkoutData.module.css";
import { useState } from "react";
import Modal from "../Modal/Modal";

const WorkoutData = ({
  fixMode,
  workout,
  idx,
  deleteWorkout,
  setFixModeFunc,
}) => {
  const [modalOn, setModalOn] = useState({
    on: false,
    message: "정말 삭제하시겠습니까?",
  });

  const closeModal = () => {
    deleteWorkout(idx);
    setModalOn((prev) => {
      return { ...prev, on: false };
    });
  };

  const deleteConfirm = () => {
    setModalOn((prev) => {
      return { ...prev, on: true };
    });
  };

  return (
    <div style={{ marginTop: "20px" }}>
      <button className={styles.fixBtn} onClick={setFixModeFunc}>
        fix mode
      </button>
      <Modal modalOn={modalOn} closeModal={closeModal} />
      <div style={{ color: "gold", fontSize: "25px" }}>
        {`Workout Num : ${idx}`}
        {fixMode && (
          <i
            class="far fa-trash-alt"
            id={styles.deleteBtn}
            onClick={deleteConfirm}
          ></i>
        )}
      </div>
      {workout.map((el) => {
        return (
          <div style={{ marginTop: "20px" }}>
            <div style={{ marginBottom: "15px", fontSize: "20px" }}>
              {el[0].name}
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
            {el.map((_) => {
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
