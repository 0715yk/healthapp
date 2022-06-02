import { useEffect, useState } from "react";
import { db } from "../../index";
import styles from "./LatestWorkout.module.css";

const LatestWorkout = ({ user }) => {
  const [workout, setWorkout] = useState({});

  // useEffect(async () => {
  //   var recordRef = await db.collection("records").doc(user.email);

  //   recordRef.get().then((doc) => {
  //     console.log(doc.data());
  //     if (doc.exists) {
  //       const data = doc.data();
  //       console.log(data);
  //       const values = Object.values(data)[0];
  //       if (values.length === 0) return;
  //       const lastIdx = values.length - 1;
  //       setWorkout(values[lastIdx]);
  //     }
  //   });
  // }, []);

  return (
    <div className={styles.latestWorkout}>
      <h2 className={styles.title}>Latest Workout</h2>
      <div
        className={styles.scorePart}
        style={Object.keys(workout).length === 0 ? { marginTop: "25px" } : null}
      >
        {Object.keys(workout).length !== 0
          ? Object.keys(workout)?.map((workoutName) => {
              return (
                <section className={styles.workoutPart}>
                  <h3 style={{ color: "white" }}>{workoutName}</h3>
                  <ul id={styles.workoutList}>
                    {workout[workoutName].map((el, key) => {
                      return (
                        <li className={styles.record} key={key}>{`set ${
                          key + 1
                        } : ${el.kg === null ? 0 : el.kg} kg x ${
                          el.reps === null ? 0 : el.reps
                        } reps`}</li>
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
