import React, { useEffect, useState } from "react";
import moment from "moment";
import styles from "./TimeLapse.module.css";
import { startTimeState } from "../states";
import { useRecoilState } from "recoil";

const TimeLapse = () => {
  const [timeLapse, setTimeLapse] = useState("0 : 0 : 1");
  const [startTime, setStartTime] = useRecoilState(startTimeState);

  useEffect(() => {
    let seconds = 2;

    const timer = setInterval(() => {
      let hour = parseInt(seconds / 3600);
      let min = parseInt((seconds % 3600) / 60);
      let sec = seconds % 60;

      setTimeLapse(`${hour} : ${min} : ${sec}`);
      seconds++;

      const newStartTime = startTime.add(1, "seconds").format("HH:mm:ss");
      setStartTime(newStartTime);
    }, 1000);

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
