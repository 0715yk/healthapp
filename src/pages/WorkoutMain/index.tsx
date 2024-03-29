import { useEffect, useState } from "react";
import styles from "./WorkoutMain.module.css";
import moment from "moment";
import {
  timeState,
  recordWorkoutState,
  loadingState,
  nowWorkingState,
} from "../../states";
import { useRecoilState, useSetRecoilState } from "recoil";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { useNavigate } from "react-router-dom";
import useCheckToken from "src/hooks/useCheckToken";
import { customAxios } from "src/utils/axios";
import Modal from "src/components/Modal/Modal";
import LatestWorkout from "src/components/LatestWorkout";
import GlowHeader from "src/components/GlowHeader/GlowHeader";
import FallbackRender from "src/components/FallbackRender";
import { ErrorBoundary } from "react-error-boundary";

const WorkoutMain = () => {
  const setLoadingSpinner = useSetRecoilState(loadingState);
  const navigate = useNavigate();
  const [selectedDate, setSelectedDate] = useState(null);
  const setRecordWorkout = useSetRecoilState(recordWorkoutState);
  const [time, setTime] = useRecoilState(timeState);
  const setNowWorking = useSetRecoilState(nowWorkingState);
  const [modalOn, setModalOn] = useState({ on: false, message: "" });

  const startWorkOut = () => {
    setNowWorking({ nowWorking: true });
    setTime({ ...time, startTime: moment() });
    navigate("/main/workout");
  };

  useCheckToken();

  useEffect(() => {
    setSelectedDate(null);

    return () => {
      setLoadingSpinner({ isLoading: false });
    };
  }, []);

  const getWorkoutData = async (selectedDate: moment.MomentInput) => {
    // 특정 날짜 값을 받고, 쿼리로 조회
    const date = moment(selectedDate).format("YYYYMMDD");
    if (date === "") return;

    // 조회한 뒤에는 날짜와 id 값을 통해 데이터를 조회(운동 기록)
    try {
      setLoadingSpinner({ isLoading: true });
      const response = await customAxios.get(`/workout/${date}`);
      setLoadingSpinner({ isLoading: false });
      setRecordWorkout(response?.data);
      navigate(`/main/records?date=${date}`);
    } catch {
      setLoadingSpinner({ isLoading: false });
      setModalOn({
        on: true,
        message: "서버 에러 입니다. 잠시후 다시 시도해주세요.",
      });
    }
  };

  const closeModal = () => {
    setModalOn({ on: false, message: "" });
  };

  return (
    <ErrorBoundary
      fallbackRender={FallbackRender}
      onReset={() => {
        setTimeout(() => {
          navigate("/");
        }, 3000);
      }}
    >
      <div className={styles.mainPage}>
        <Modal modalOn={modalOn} closeModal={closeModal} />
        <GlowHeader
          title={"Start Workout"}
          style={{
            fontSize: "13vw",
            textAlign: "left",
            marginLeft: "15px",
            paddingTop: "40px",
          }}
        />
        <main>
          <article>
            <h2>Quick Start</h2>
            <button className={styles.strtBtn} onClick={startWorkOut}>
              Start an Empty Workout
            </button>
          </article>
          <article>
            <h2>Check Records</h2>
            <DatePicker
              className={styles.dateInput}
              onChange={getWorkoutData}
              maxDate={new Date()}
              selected={selectedDate}
              placeholderText={"Please select a date"}
              onChangeRaw={(e: React.FocusEvent<HTMLInputElement>) =>
                e.preventDefault()
              }
              withPortal
            />
          </article>
          <article>
            <LatestWorkout />
          </article>
        </main>
      </div>
    </ErrorBoundary>
  );
};

export default WorkoutMain;
