import React, { useEffect, useState } from "react";
import styles from "./Record.module.css";
import { useHistory } from "react-router-dom";
import moment from "moment";
import { useRecoilState } from "recoil";
import { workoutState } from "../states";
import { startTimeState } from "../states";

const Record = ({ checkList }) => {
  const [startTime, setStartTime] = useRecoilState(startTimeState);
  const [totalRecord, setTotalRecord] = useState({});
  const history = useHistory();
  const [bestSet, setBestSet] = useState({});
  const [workouts, setWorkouts] = useRecoilState(workoutState);

  useEffect(() => {
    const copyObj = { ...checkList };
    const copySet = { ...bestSet };
    for (let [key, value] of Object.entries(copyObj)) {
      if (value.length === 0) continue;
      var best = [0, 0];
      for (let el of value) {
        if (parseInt(best[0]) <= parseInt(el.kg)) {
          if (parseInt(best[0]) === parseInt(el.kg)) {
            if (parseInt(best[1]) < parseInt(el.reps)) {
              best = [el.kg, el.reps];
            }
            continue;
          }
          best = [el.kg, el.reps];
        }
      }
      copySet[key] = best;
    }
    setBestSet(copySet);
    const record = {};
    const endTIme = moment().format("HH:mm");
    let [a, b] = startTime.split(":");
    let [c, d] = endTIme.split(":");
    a = parseInt(a);
    b = parseInt(b);
    c = parseInt(c);
    d = parseInt(d);

    const hour = c - a;
    const min = b > d ? 60 - b + d : d - b;

    record["timeLapse"] = `${hour} hr ${min} min`;
    record["startTime"] = startTime;
    record["finishedTime"] = moment().format("HH:mm");
    setTotalRecord(record);
  }, []);

  const completeWorkout = async () => {
    setWorkouts([]);
    history.push("/main");
  };

  return (
    <div className={styles.recordPage}>
      <button className={styles.glowBtn} onClick={completeWorkout}></button>
      <header className={styles.recordHeader}>
        <h2>Records</h2>
      </header>
      <main>
        <article id={styles.totalRecordPart}>
          <h3 style={{ color: "gold" }}>Total ⏱</h3>
          <ul>
            <li>{moment().format("YYYY-MM-D (dddd)")}</li>
            {/* {`${totalRecord["timeLapse"]} [${totalRecord["startTime"]} ~ ${totalRecord["finishedTime"]}]`} */}
            <li className={styles.timeLapsePart}>{startTime}</li>
            <li>
              <h3 id={styles.bestSetH} style={{ color: "gold" }}>
                Best set 🏅
              </h3>
              <ul list-style="none">
                {Object.keys(bestSet).map((el) => {
                  return (
                    <li>{`${el} : ${bestSet[el][0]} kg x ${bestSet[el][1]} reps`}</li>
                  );
                })}
              </ul>
            </li>
          </ul>
        </article>
        <article id={styles.tablePart}>
          <h3 id={styles.workoutsPart} style={{ color: "gold" }}>
            Workouts ⭐
          </h3>
          {Object.keys(checkList).map((workoutName) => {
            return (
              <section>
                <h3>{workoutName}</h3>
                <section id={styles.workoutList}>
                  {checkList[workoutName].map((el, key) => {
                    return (
                      <div className={styles.record} key={key}>{`set ${
                        key + 1
                      } : ${el.kg === null ? 0 : el.kg} kg x ${
                        el.reps === null ? 0 : el.reps
                      } reps`}</div>
                    );
                  })}
                </section>
              </section>
            );
          })}
        </article>
      </main>
    </div>
  );
};

export default Record;
