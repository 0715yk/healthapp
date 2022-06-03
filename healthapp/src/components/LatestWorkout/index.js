import { useEffect, useState } from "react";
import { db } from "../../index";
import styles from "./LatestWorkout.module.css";

const LatestWorkout = ({ user }) => {
  const [workouts, setWorkouts] = useState([]);
  const [date, setDate] = useState("");

  useEffect(async () => {
    var recordRef = await db.collection("records").doc(user.email);

    recordRef.get().then((doc) => {
      if (doc.exists) {
        const data = doc.data();
        const keys = Object.keys(data);
        const latestDate = keys[keys.length - 1];

        const latestWorkouts = JSON.parse(
          data[latestDate][data[latestDate].length - 1]
        );
        setDate(latestDate);
        setWorkouts(latestWorkouts);
      }
    });
  }, []);

  return (
    <div className={styles.latestWorkout}>
      <h2 className={styles.title}>Latest Workout</h2>
      <div className={styles.date}>{`Latest Workout Date : ${date}`}</div>
      <div
        className={styles.scorePart}
        style={workouts.length === 0 ? { marginTop: "25px" } : null}
      >
        {workouts.length !== 0
          ? workouts.map((workout) => {
              return (
                <section className={styles.workoutPart}>
                  <h3 style={{ color: "white" }}>{workout[0].name}</h3>
                  <ul id={styles.workoutList}>
                    {workout.map((el, key) => {
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
