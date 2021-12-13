import React, { useEffect, useState } from "react";
import moment from "moment";
import styles from "./TimeLapse.module.css";

const TimeLapse = () => {
  const [timeLapse, setTimeLapse] = useState("");

  useEffect(() => {
    const now = moment();
    var timer = setInterval(() => {
      var s = moment.duration(
        moment().diff(moment(now, "DD/MM/YYYY HH:mm:ss"))
      );
      const time = {
        hr: s.hours(),
        min: s.minutes(),
        sec: s.seconds(),
      };

      setTimeLapse(`${time.hr} : ${time.min} : ${time.sec}`);
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
