import { useEffect, useState } from "react";
import styles from "./TimeLapse.module.css";
import { useRecoilValue } from "recoil";
import { timeState } from "../../states";
import moment from "moment";

const TimeLapse = () => {
  const [timeLapse, setTimeLapse] = useState("0 : 0 : 0");
  const time = useRecoilValue(timeState);

  useEffect(() => {
    const diff = moment().diff(time.startTime);
    const workoutTime = moment.utc(diff).format("HH:mm:ss");

    setTimeLapse(workoutTime);

    const timer = setInterval(() => {
      const diff = moment().diff(time.startTime);
      const workoutTime = moment.utc(diff).format("HH:mm:ss");
      setTimeLapse(workoutTime);
    });

    return () => {
      clearInterval(timer);
    };
  }, []);

  return (
    <div className={styles.timeLapse}>
      <div className={styles.timeText}>{`TimeLapse : ${timeLapse}`}</div>
    </div>
  );
};

export default TimeLapse;
