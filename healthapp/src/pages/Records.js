import React, { useEffect, useState } from "react";
import styles from "./Records.module.css";
import { useHistory } from "react-router-dom";
import { db } from "..";

const Records = ({ color, user }) => {
  const [checkLists, setCheckLists] = useState({});
  const [empty, setEmpty] = useState(true);
  const history = useHistory();

  useEffect(async () => {
    var recordRef = await db.collection("records").doc(user.email);
    recordRef.get().then((doc) => {
      if (doc.exists) {
        const data = doc.data();
        setCheckLists(data);
      }
    });
  }, []);

  const back = () => {
    history.push("/main");
  };

  return (
    <div className={styles.recordPage}>
      <header>
        <h2>Records</h2>
      </header>
      <button className={styles.glowBtn} onClick={back}></button>
      <main>
        {Object.keys(checkLists).map((date) => {
          return (
            <section>
              <h2>{date}</h2>
              <article id={styles.tablePart}>
                {checkLists[date].map((workout, num) => {
                  return (
                    <div className={styles.playPart}>
                      <h1 style={{ fontSize: "25px" }}>{`workout ${
                        num + 1
                      }`}</h1>
                      <div className={styles.scorePart}>
                        {Object.keys(workout).map((workoutName) => {
                          return (
                            <section>
                              <h3>{workoutName}</h3>
                              <section id={styles.workoutList}>
                                {workout[workoutName].map((el, key) => {
                                  return (
                                    <div
                                      className={styles.record}
                                      key={key}
                                    >{`set ${key + 1} : ${
                                      el.kg === null ? 0 : el.kg
                                    } kg x ${
                                      el.reps === null ? 0 : el.reps
                                    } reps`}</div>
                                  );
                                })}
                              </section>
                            </section>
                          );
                        })}
                      </div>
                    </div>
                  );
                })}
              </article>
            </section>
          );
        })}
      </main>
    </div>
  );
};

export default Records;
