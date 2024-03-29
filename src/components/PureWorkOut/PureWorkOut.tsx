import { useState, useRef, useCallback, KeyboardEvent } from "react";
import styles from "./PureWorkOut.module.css";
import Row from "../Row/Row";
import { useRecoilState } from "recoil";
import { workoutState } from "../../states";
import Modal from "../Modal/Modal";
import { WorkoutRecord } from "../../states/types";

interface Props {
  idx: number;
  workoutList: WorkoutRecord[];
}

const PureWorkOut = ({ idx, workoutList }: Props) => {
  const [btnOption, setBtnOption] = useState(false);
  const [workouts, setWorkouts] = useRecoilState(workoutState);
  const [fixMode, setFixMode] = useState(false);
  const [modalOn, setModalOn] = useState({ on: false, message: "" });
  const titleRef = useRef<HTMLInputElement | null>(null);

  const addSet = useCallback(() => {
    const copyArr = workouts.slice();
    const copyWorkoutList = workoutList.slice();

    if (
      copyWorkoutList[copyWorkoutList.length - 1].kg === "" &&
      copyWorkoutList[copyWorkoutList.length - 1].reps === ""
    ) {
      setModalOn((prev) => ({
        on: !prev.on,
        message: "이전 세트를 완료해주세요",
      }));
      return;
    }

    copyWorkoutList.push({
      name: copyWorkoutList[copyWorkoutList.length - 1].name,
      set: copyWorkoutList[copyWorkoutList.length - 1].set + 1,
      kg: "",
      reps: "",
      bestSet: false,
      done: false,
    });
    copyArr[idx] = copyWorkoutList;
    setWorkouts(copyArr);
  }, [idx, setWorkouts, workouts, workoutList]);

  const fixTitle = () => {
    const copyWorkoutList = workoutList.slice();

    if (fixMode) {
      const copyArr = workouts.slice();

      if (
        titleRef?.current &&
        titleRef.current.value.replace(/ /g, "") === ""
      ) {
        setModalOn((prev) => ({
          on: !prev.on,
          message: "최소한 한글자 이상을 입력해주세요",
        }));
        return;
      }

      setFixMode(false);

      copyArr[idx] = [
        ...copyWorkoutList.map((el) => {
          if (titleRef?.current) {
            const copyEl = Object.assign({}, el);
            copyEl.name = titleRef.current.value;
            return copyEl;
          } else {
            return el;
          }
        }),
      ];
      setWorkouts(copyArr);
    } else {
      setFixMode(true);
      setTimeout(() => {
        if (titleRef?.current) {
          titleRef.current.value =
            copyWorkoutList[copyWorkoutList.length - 1].name;
          titleRef.current.focus();
        }
      });
    }
  };

  const deleteWorkout = () => {
    setBtnOption(true);
    setModalOn({ on: true, message: "정말 삭제하시겠습니까?" });
  };

  const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") fixTitle();
  };

  const closeModal = useCallback(() => {
    if (btnOption) {
      let copyArr = workouts.slice();
      copyArr = copyArr.filter((el, _) => {
        if (idx === _) return false;
        else return true;
      });
      setWorkouts(copyArr);
      setBtnOption(false);
      setModalOn({ on: false, message: "" });
    } else {
      setModalOn((prev) => ({ on: !prev.on, message: prev.message }));
    }
  }, [setWorkouts, setModalOn, btnOption, workouts, idx]);

  const cancelModal = () => {
    setModalOn({ on: false, message: "" });
  };
  return (
    <>
      <Modal
        modalOn={modalOn}
        closeModal={closeModal}
        cancelModalOn={btnOption}
        cancelModal={cancelModal}
      />
      <div className={styles.title}>
        {fixMode ? (
          <input ref={titleRef} onKeyDown={handleKeyDown} />
        ) : (
          <div className={styles.titleScroll}>
            {workouts[idx] && workouts[idx][0]?.name}
          </div>
        )}
        <i className="far fa-edit" id={styles.fixBtn} onClick={fixTitle}></i>
        <i
          className="far fa-trash-alt"
          id={styles.deleteBtn}
          onClick={deleteWorkout}
        ></i>
      </div>
      <div className={styles.rows} key={idx}>
        {workoutList.map((el, keyIdx) => {
          return (
            <Row key={keyIdx} workoutList={workoutList} idx={idx} el={el} />
          );
        })}
        <button id={styles.addBtn} onClick={addSet}>
          +
        </button>
      </div>
    </>
  );
};

export default PureWorkOut;
