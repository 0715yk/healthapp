import { useEffect, useState, useRef, useCallback } from "react";
import styles from "./LatestWorkout.module.css";
import { customAxios } from "src/utils/axios";
import { useRecoilState, useSetRecoilState } from "recoil";
import {
  getLatestFlagState,
  latestWorkoutDateState,
  latestWorkoutState,
  loadingState,
} from "src/states";
import { useLocation, useSearchParams } from "react-router-dom";
import cookies from "react-cookies";

const LatestWorkout = () => {
  const { state } = useLocation();
  const divRef = useRef<HTMLDivElement | null>(null);
  const [date, setDate] = useRecoilState(latestWorkoutDateState);
  const [workouts, setWorkouts] = useRecoilState(latestWorkoutState);
  const setLoadingSpinner = useSetRecoilState(loadingState);
  const setLatestFlag = useSetRecoilState(getLatestFlagState);
  const [queryParameters] = useSearchParams();

  const getLatest = useCallback(async () => {
    const socialToken = queryParameters.get("code");

    if (socialToken) {
      const jwtToken = cookies.load("access_token");
      if (!jwtToken) {
        cookies.save("access_token", socialToken, {
          path: "/",
        });
      }
    }
    setLoadingSpinner({ isLoading: true });
    try {
      const response = await customAxios.get("/workout/latest");
      const workoutNames = response.data[0].workoutNames;
      setWorkouts(workoutNames);
      const latestDate = response.data.latestDate;

      setDate(
        `${latestDate.substring(0, 4)}/${latestDate.substring(
          4,
          6
        )}/${latestDate.substring(6)}`
      );
      setLoadingSpinner({ isLoading: false });
    } catch (err) {
      console.log(err);
      setLoadingSpinner({ isLoading: false });
    }
  }, [setDate, queryParameters, setLoadingSpinner, setWorkouts]);

  useEffect(() => {
    const socialToken = queryParameters.get("code");

    if (state === "ON" || state === "login" || socialToken) {
      setLatestFlag("OFF");
      void getLatest();
    }
    if (divRef?.current) {
      const rect = divRef.current.getBoundingClientRect();
      setRectHeight(rect.y);
    }
  }, []);

  const [rectHeight, setRectHeight] = useState(0);

  return (
    <div className={styles.latestWorkout}>
      <h2 className={styles.title}>Latest Workout</h2>
      <div className={styles.date}>{`Latest Workout Date : ${date}`}</div>
      <div
        className={styles.scorePart}
        ref={divRef}
        style={{
          height: `calc(100vh - ${80 + rectHeight}px)`,
        }}
      >
        {workouts.length !== 0
          ? workouts.map((workout) => {
              return (
                <section className={styles.workoutPart} key={workout.id}>
                  <h3 style={{ color: "white" }} className={styles.workoutName}>
                    {workout?.workoutName}
                  </h3>
                  <ul id={styles.workoutList}>
                    {workout?.workouts?.map((el, key) => {
                      return (
                        <li
                          className={styles.workoutSetPart}
                          key={el.set}
                          style={el.bestSet ? { color: "yellow" } : {}}
                        >{`set ${key + 1} : ${
                          el.kg === ""
                            ? 0
                            : String(el.kg).length >= 5
                            ? `${String(el.kg).substring(0, 5)}...`
                            : el.kg || 0
                        } kg x ${
                          el.reps === ""
                            ? 0
                            : String(el.reps).length >= 5
                            ? `${String(el.reps).substring(0, 5)}...`
                            : el.reps || 0
                        } reps ${el.bestSet ? "🏅" : ""}`}</li>
                      );
                    })}
                  </ul>
                </section>
              );
            })
          : "최신 기록이 없습니다"}
      </div>
    </div>
  );
};

export default LatestWorkout;
