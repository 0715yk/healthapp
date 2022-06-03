import React, { useEffect, useState } from "react";
import styles from "./TimeLapse.module.css";

const TimeLapse = () => {
  const [timeLapse, setTimeLapse] = useState("0 : 0 : 1");

  useEffect(() => {
    let seconds = 2;

    const timer = setInterval(() => {
      let hour = parseInt(seconds / 3600);
      let min = parseInt((seconds % 3600) / 60);
      let sec = seconds % 60;

      setTimeLapse(`${hour} : ${min} : ${sec}`);
      seconds++;
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
