import { useState, useCallback } from "react";
import styles from "./WorkOutList.module.css";
import { useNavigate } from "react-router-dom";
import PureWorkOut from "../PureWorkOut/PureWorkOut";
import moment from "moment";
import Modal from "../Modal/Modal";
import { useRecoilState, useSetRecoilState } from "recoil";
import {
  workoutState,
  timeState,
  loadingState,
  getLatestFlagState,
} from "../../states";
import { customAxios } from "src/utils/axios";
import _ from "lodash";

interface Props {
  offsetHeight: number;
}

const WorkOutList = ({ offsetHeight }: Props) => {
  const setLatestFlag = useSetRecoilState(getLatestFlagState);
  const setLoadingSpinner = useSetRecoilState(loadingState);
  const [workouts, setWorkouts] = useRecoilState(workoutState);
  const [time, setTime] = useRecoilState(timeState);
  const [modalOn, setModalOn] = useState({ on: false, message: "" });
  const [btnOption, setBtnOption] = useState(false);
  const navigate = useNavigate();
  const finishWorkout = useCallback(async () => {
    if (workouts.length === 0) {
      setBtnOption(false);
      setModalOn({
        on: true,
        message: "하나 이상의 루틴을 실행해 주세요",
      });
      return;
    }
    setLoadingSpinner({ isLoading: true });
    setTime({ ...time, endTime: moment() });

    let copyArr = _.cloneDeep(workouts);
    copyArr = copyArr
      .map((arr) => {
        return arr.filter((el) => {
          if (el.kg === "" || el.reps === "") return false;
          else return true;
        });
      })
      .filter((el) => el.length !== 0);

    if (copyArr.length === 0) {
      setBtnOption(false);
      setModalOn({
        on: true,
        message: "하나 이상의 루틴을 실행해 주세요",
      });
      setLoadingSpinner({ isLoading: false });
      return;
    }

    const bestSets = copyArr.map((workout) => {
      const workoutCopyArr = workout.slice();
      workoutCopyArr.sort((x, y) => {
        const prevScore =
          (parseInt(x.reps) === 0 ? 1 : parseInt(x.reps)) *
          (parseInt(x.kg) === 0 ? 1 : parseInt(x.kg));

        const nextScore =
          (parseInt(y.reps) === 0 ? 1 : parseInt(y.reps)) *
          (parseInt(y.kg) === 0 ? 1 : parseInt(y.kg));

        if (nextScore === prevScore) {
          return parseInt(y.kg) - parseInt(x.kg);
        } else return nextScore - prevScore;
      });

      const setNum = workoutCopyArr[0].set - 1;
      workout[setNum].bestSet = true;
      return workout;
    });

    const date = moment().format("YYYYMMDD");

    try {
      await customAxios.post("/workout", {
        date: date,
        workouts: bestSets,
      });
      setLoadingSpinner({ isLoading: false });
      setModalOn({ on: false, message: "" });
      setWorkouts(copyArr);
      setLatestFlag("ON");
      navigate("/main/record");
    } catch {
      setLoadingSpinner({ isLoading: false });
      setModalOn({
        on: true,
        message: "서버 에러 입니다. 잠시후 다시 시도해주세요.",
      });
    }
  }, [
    navigate,
    setLoadingSpinner,
    time,
    setWorkouts,
    workouts,
    setTime,
    setLatestFlag,
  ]);

  const checkFinishWorkout = () => {
    setBtnOption(true);
    setModalOn({ on: true, message: "정말 끝내시겠습니까?" });
  };

  const closeModal = useCallback(() => {
    if (btnOption) {
      void finishWorkout();
    } else {
      setModalOn({ on: false, message: "" });
    }
  }, [btnOption, finishWorkout, setModalOn]);

  const cancelModal = () => {
    setBtnOption(false);
    setModalOn({ on: false, message: "" });
  };

  return (
    <div className={styles.writeFunc} style={{ paddingTop: offsetHeight }}>
      <Modal
        modalOn={modalOn}
        closeModal={closeModal}
        cancelModalOn={btnOption}
        cancelModal={cancelModal}
      />
      <main>
        <section>
          {workouts.map((workout, idx) => {
            return <PureWorkOut key={idx} workoutList={workout} idx={idx} />;
          })}
        </section>
        <section className={styles.doneBtnPart}>
          <button
            className={styles.glowBtn}
            onClick={checkFinishWorkout}
          ></button>
        </section>
      </main>
    </div>
  );
};

export default WorkOutList;
