import styles from "./WorkoutSet.module.css";
import React, { useEffect, useState } from "react";
import _ from "lodash";
import Modal from "../Modal/Modal";
import { customAxios } from "src/utils/axios";
import { useRecoilState } from "recoil";
import { recordWorkoutState } from "src/states";

const WorkoutSet = ({
  el,
  setIdx,
  fixMode,
  datesId,
  idx,
  workoutNameIdx,
  workoutNumId,
  date,
}) => {
  const [recordWorkout, setRecordWorkout] = useRecoilState(recordWorkoutState);
  const [setUpdateOn, setSetUpdateOn] = useState(false);
  const [modalOn, setModalOn] = useState({
    on: false,
    message: "정말 삭제하시겠습니까?",
  });
  const [alertOn, setAlertOn] = useState({
    on: false,
    message: "최소 한 개 이상의 reps를 기입해주세요.",
  });

  const [inputValue, setInputValue] = useState({
    kg: el.kg,
    reps: el.reps,
  });

  useEffect(() => {
    if (fixMode === false) {
      setSetUpdateOn(false);
    }
  }, [fixMode]);

  const updateSet = async () => {
    // if (inputValue.reps <= 0) {
    //   setAlertOn((prev) => ({
    //     ...prev,
    //     on: true,
    //   }));
    //   return;
    // }
    // const batch = db.batch();
    // const copyWorkout = _.cloneDeep(dateWorkout);
    // const fbData = {};
    // const resultArr = [];
    // let key = 0;
    // for (let i = 0; i < copyWorkout.length; i++) {
    //   let nowArr = null;
    //   if (i !== idx) nowArr = copyWorkout[i];
    //   else {
    //     nowArr = copyWorkout[i].map((arr, _) => {
    //       if (_ === workoutNameIdx) {
    //         return arr.map((j, k) => {
    //           if (k === setIdx) {
    //             j.kg = inputValue.kg;
    //             j.reps = inputValue.reps;
    //           }
    //           return j;
    //         });
    //       } else return arr;
    //     });
    //   }
    //   fbData[key] = JSON.stringify(nowArr);
    //   resultArr.push(nowArr);
    //   key++;
    // }
    // fbData.order = date;
    // const recordRef = await db.collection(email).doc(date);
    // await batch.set(recordRef, fbData);
    // await batch.commit().then(() => {
    //   setDateWorkout(resultArr);
    // });
    // setSetUpdateOn((prev) => !prev);
  };
  //  id: number;
  //  datesId: number;
  //  workoutNumId: number;
  //  workoutNameId: number;
  const deleteSet = async () => {
    const id = el.id;
    const workoutNameId = el.workoutNameId;
    try {
      const response = await customAxios.delete("workout/workout", {
        data: {
          id,
          workoutNumId,
          datesId,
          workoutNameId,
        },
      });

      if (response.status === 200) {
        let copyWorkout = _.cloneDeep(recordWorkout);

        const resultArr = [];

        for (let i = 0; i < copyWorkout.length; i++) {
          let nowArr = null;
          if (i !== idx) nowArr = copyWorkout[i].workoutNames;
          else {
            nowArr = copyWorkout[i].workoutNames.map((arr, _) => {
              if (_ === workoutNameIdx) {
                return arr?.workouts.filter((j, k) => {
                  if (k === setIdx) return false;
                  else return true;
                });
              } else return arr?.workouts;
            });
          }
          nowArr = nowArr.filter((el) => {
            if (el.length === 0) return false;
            else return true;
          });
          if (nowArr.length === 0) continue;

          resultArr.push(nowArr);
        }
        console.log(resultArr, recordWorkout);
        setRecordWorkout(resultArr);
        setSetUpdateOn((prev) => !prev);
      }
    } catch (err) {
      console.log(err);
      setModalOn({
        on: true,
        message: "서버 에러 입니다. 잠시후 다시 시도해주세요.",
      });
    }
    // var batch = db.batch();
    // let copyWorkout = _.cloneDeep(dateWorkout);
    // const fbData = {};
    // const resultArr = [];
    // let key = 0;
    // for (let i = 0; i < copyWorkout.length; i++) {
    //   let nowArr = null;
    //   if (i !== idx) nowArr = copyWorkout[i];
    //   else {
    //     nowArr = copyWorkout[i].map((arr, _) => {
    //       if (_ === workoutNameIdx) {
    //         return arr.filter((j, k) => {
    //           if (k === setIdx) return false;
    //           else return true;
    //         });
    //       } else return arr;
    //     });
    //   }
    //   nowArr = nowArr.filter((el) => {
    //     if (el.length === 0) return false;
    //     else return true;
    //   });
    //   if (nowArr.length === 0) continue;
    //   fbData[key] = JSON.stringify(nowArr);
    //   resultArr.push(nowArr);
    //   key++;
    // }
    // fbData.order = date;
    // const recordRef = await db.collection(email).doc(date);
    // if (resultArr.length === 0) {
    //   recordRef
    //     .delete()
    //     .then(() => {
    //       setDateWorkout(resultArr);
    //     })
    //     .catch((error) => {
    //       console.error("Error removing document: ", error);
    //     });
    // } else {
    //   await batch.set(recordRef, fbData);
    //   await batch.commit().then(() => {
    //     setDateWorkout(resultArr);
    //   });
    // }
    // setSetUpdateOn((prev) => !prev);
  };

  const setModalOnFunc = () => {
    setModalOn((prev) => {
      return { ...prev, on: !prev.on };
    });
  };

  const closeModal = () => {
    deleteSet();
    setModalOn((prev) => {
      return { ...prev, on: false };
    });
  };

  const closeAlert = () => {
    setAlertOn((prev) => ({
      ...prev,
      on: false,
    }));
  };

  const xBtnFunc = () => {
    setInputValue({
      kg: el.kg,
      reps: el.reps,
    });
    setSetUpdateOn((prev) => !prev);
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") updateSet();
  };

  return (
    <div className={styles.record}>
      <Modal modalOn={alertOn} closeModal={closeAlert} />
      <Modal
        modalOn={modalOn}
        closeModal={closeModal}
        cancelModal={setModalOnFunc}
      />
      {fixMode ? (
        <>
          {setUpdateOn ? (
            <div className={styles.setUpdatePart}>
              <div>{`set ${setIdx + 1} : `}&nbsp;</div>
              <input
                className={styles.setInput}
                value={inputValue?.kg}
                onKeyDown={handleKeyDown}
                onChange={(e) =>
                  setInputValue((prev) => ({ ...prev, kg: e.target.value }))
                }
              />
              &nbsp;
              <div>kg x &nbsp;</div>
              <input
                className={styles.setInput}
                value={inputValue?.reps}
                onKeyDown={handleKeyDown}
                onChange={(e) =>
                  setInputValue((prev) => ({ ...prev, reps: e.target.value }))
                }
              />
              &nbsp;
              <div>reps</div>
              <i class="far fa-edit" id={styles.fixBtn} onClick={updateSet}></i>
              <i
                class="far fa-trash-alt"
                id={styles.deleteBtn}
                onClick={setModalOnFunc}
              ></i>
              <div id={styles.xBtn} onClick={xBtnFunc}>
                X
              </div>
            </div>
          ) : (
            <>
              {`set ${setIdx + 1} : ${el?.kg || 0} kg x ${el?.reps || 0} reps`}
              <i
                class="far fa-edit"
                id={styles.fixBtn}
                onClick={() => {
                  setSetUpdateOn((prev) => !prev);
                }}
              ></i>
            </>
          )}
        </>
      ) : (
        `set ${setIdx + 1} : ${el.kg === null ? 0 : el.kg} kg x ${
          el.reps === null ? 0 : el.reps
        } reps`
      )}
    </div>
  );
};

export default React.memo(WorkoutSet);
