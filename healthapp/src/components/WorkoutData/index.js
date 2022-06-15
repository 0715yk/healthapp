import styles from "./WorkoutData.module.css";
import { useState } from "react";
import Modal from "../Modal/Modal";
import { db } from "../../index";
import { useRecoilState } from "recoil";
import { dateWorkoutState } from "../../states";
import _ from "lodash";

const WorkoutData = ({ fixMode, workout, idx, setFixModeFunc }) => {
  const [confirmType, setConfirmType] = useState(null);
  const [dateWorkout, setDateWorkout] = useRecoilState(dateWorkoutState);
  const [workoutName, setWorkoutName] = useState(null);
  const [setIdx, setSetIdx] = useState(null);
  const [modalOn, setModalOn] = useState({
    on: false,
    message: "정말 삭제하시겠습니까?",
  });
  const [workoutUpdateOn, setWorkoutUpdateOn] = useState({});
  const [workoutNameInput, setWorkoutNameInput] = useState("");
  const [setUpdateOn, setSetUpdateOn] = useState({});

  const queryString = window.location.search;
  const urlParams = new URLSearchParams(queryString);
  const email = urlParams.get("email");
  const date = urlParams.get("date");

  // workout 제거 함수
  const deleteWorkout = async () => {
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
          .slice(0, workoutName)
          .concat(copyWorkout[i].slice(workoutName + 1));
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
  };

  // set 제거 함수
  const deleteSet = async () => {
    var batch = db.batch();
    let copyWorkout = _.cloneDeep(dateWorkout);
    const fbData = {};

    copyWorkout = copyWorkout.map((els, _) => {
      if (_ !== idx) return els;
      else
        return els.map((el, i) => {
          if (i === setIdx?.workoutNameIdx) {
            return el.filter((l, j) => {
              if (j === setIdx?.setIdx) return false;
              else return true;
            });
          } else return el;
        });
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

  const closeModal = () => {
    if (confirmType === "workout") deleteWorkout();
    else if (confirmType === "workoutName") deleteWorkoutName();
    else if (confirmType === "set") deleteSet();
    else return;

    setModalOn((prev) => {
      return { ...prev, on: false };
    });
  };

  const deleteConfirm = () => {
    setModalOn((prev) => {
      return { ...prev, on: true };
    });
  };

  const setModalOnFunc = (type) => {
    setConfirmType(type);
    setModalOn((prev) => {
      return { ...prev, on: !prev.on };
    });
  };

  const updateWorkoutName = async () => {
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
          if (_ === workoutUpdateOn?.workoutNameIdx) {
            return arr.map((el) => {
              el.name = workoutNameInput;
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
  };

  const updateSet = async () => {
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
          if (_ === workoutUpdateOn?.workoutNameIdx) {
            return arr.map((el) => {
              el.name = workoutNameInput;
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
  };

  return (
    <div style={{ marginTop: "20px" }}>
      <button className={styles.fixBtn} onClick={setFixModeFunc}>
        {fixMode ? "done" : `fix mode`}
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
            onClick={() => setModalOnFunc("workout")}
          ></i>
        )}
      </div>
      {workout.map((el, workoutNameIdx) => {
        return (
          <div style={{ marginTop: "20px" }}>
            <div className={styles.workoutName}>
              {fixMode ? (
                <>
                  {workoutUpdateOn?.on &&
                  workoutUpdateOn?.workoutNameIdx === workoutNameIdx ? (
                    <div className={styles.updatePart}>
                      <input
                        className={styles.workoutNameInput}
                        value={workoutNameInput}
                        onChange={(e) => setWorkoutNameInput(e.target.value)}
                      />
                      <i
                        class="far fa-edit"
                        id={styles.updateBtn}
                        onClick={() => {
                          updateWorkoutName();
                          setWorkoutUpdateOn((prev) => ({
                            on: !prev.on,
                            workoutNameIdx,
                          }));
                        }}
                      ></i>
                      <i
                        class="far fa-trash-alt"
                        id={styles.deleteBtn}
                        onClick={() => {
                          setWorkoutName(workoutNameIdx);
                          setModalOnFunc("workoutName");
                          setWorkoutUpdateOn((prev) => ({
                            ...prev,
                            on: !prev.on,
                          }));
                          setWorkoutNameInput("");
                        }}
                      ></i>
                      <div
                        onClick={() => {
                          setWorkoutUpdateOn((prev) => ({
                            on: !prev.on,
                            workoutNameIdx,
                          }));
                        }}
                      >
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
                          setWorkoutUpdateOn((prev) => ({
                            on: !prev.on,
                            workoutNameIdx,
                          }));
                          setWorkoutNameInput(el[0]?.name);
                        }}
                      ></i>
                    </>
                  )}
                </>
              ) : (
                el[0]?.name
              )}
            </div>
            {el.map((_, setIdx) => {
              return (
                <div className={styles.record}>
                  {fixMode ? (
                    <>
                      {setUpdateOn.on && setUpdateOn.idx === setIdx ? (
                        <div className={styles.setUpdatePart}>
                          <i
                            class="far fa-edit"
                            id={styles.fixBtn}
                            onClick={() => {
                              setSetUpdateOn((prev) => ({
                                ...prev,
                                on: !prev.on,
                                idx: setIdx,
                              }));
                            }}
                          ></i>
                          <i
                            class="far fa-trash-alt"
                            id={styles.deleteBtn}
                            onClick={() => {
                              setSetIdx({ workoutNameIdx, setIdx });
                              setModalOnFunc("set");
                              setSetUpdateOn((prev) => ({
                                ...prev,
                                on: !prev.on,
                              }));
                            }}
                          ></i>
                          <div
                            onClick={() => {
                              setSetUpdateOn((prev) => ({
                                ...prev,
                                on: !prev.on,
                              }));
                            }}
                          >
                            X
                          </div>
                        </div>
                      ) : (
                        <>
                          {`set ${setIdx + 1} : ${
                            _.kg === null ? 0 : _.kg
                          } kg x ${_.reps === null ? 0 : _.reps} reps`}
                          <i
                            class="far fa-edit"
                            id={styles.fixBtn}
                            onClick={() => {
                              setSetUpdateOn((prev) => ({
                                ...prev,
                                on: !prev.on,
                                idx: setIdx,
                              }));
                            }}
                          ></i>
                        </>
                      )}
                    </>
                  ) : (
                    `set ${setIdx + 1} : ${_.kg === null ? 0 : _.kg} kg x ${
                      _.reps === null ? 0 : _.reps
                    } reps`
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
