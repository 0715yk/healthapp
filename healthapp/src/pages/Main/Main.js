import React, { useRef, useState } from "react";
import styles from "./Main.module.css";
import GlowHeader from "../../components/GlowHeader/GlowHeader";
import { useHistory } from "react-router-dom";
import moment from "moment";
import LatestWorkout from "../../components/LatestWorkout";
import { timeState } from "../../states";
import { useRecoilState } from "recoil";
import WorkoutModal from "../../components/WorkoutModal";
import WorkoutData from "../../components/WorkoutData";
import _ from "lodash";
import { db } from "../../index";

const Main = ({ user }) => {
  const dateRef = useRef("");
  const history = useHistory();
  const [dateWorkout, setDateWorkout] = useState([]);
  const [modalOn, setModalOn] = useState(false);
  const [time, setTime] = useRecoilState(timeState);
  const startWorkOut = () => {
    setTime({ ...time, startTime: moment() });
    history.push("/workout");
  };

  const getWorkoutData = async () => {
    const date = dateRef.current.value.replaceAll("-", "");
    if (date === "") return;

    var recordRef = await db.collection(user.email).doc(date);

    recordRef
      .get()
      .then(function (querySnapshot) {
        if (querySnapshot.exists) {
          const dateWorkoutData = [];
          const data = querySnapshot.data();
          for (let key of Object.keys(data)) {
            if (key === "order") continue;
            dateWorkoutData.push(JSON.parse(data[key]));
          }
          setDateWorkout(dateWorkoutData);
        }
      })
      .catch(function (error) {
        console.log("Error getting document:", error);
      });

    setModalOn(true);
  };

  const closeModal = () => {
    dateRef.current.value = null;
    setDateWorkout([]);
    setModalOn(false);
  };

  const deleteWorkout = async (idx) => {
    var batch = db.batch();
    let copyWorkout = _.cloneDeep(dateWorkout);
    copyWorkout = copyWorkout.filter((el, _) => {
      if (_ === idx) return false;
      else return true;
    });
    const fbData = {};
    for (let i = 0; i < copyWorkout.length; i++) {
      fbData.i = JSON.parse(copyWorkout[i]);
    }

    const recordRef = await db.collection("calmmne@naver.com").doc("20220614");
    await batch.set(recordRef, fbData);
    await batch.commit().then(() => {
      setDateWorkout(copyWorkout);
    });
  };

  const [fixMode, setFixMode] = useState(false);
  const setFixModeFunc = () => {
    setFixMode((prev) => !prev);
  };

  return (
    <div className={styles.mainPage}>
      <WorkoutModal modalOn={modalOn} closeModal={closeModal}>
        {dateWorkout.length !== 0 ? (
          <section style={{ color: "#ffffff" }}>
            <section id={styles.workoutList}>
              {dateWorkout.map((workout, idx) => {
                return (
                  <WorkoutData
                    workout={workout}
                    idx={idx}
                    deleteWorkout={deleteWorkout}
                    setFixModeFunc={setFixModeFunc}
                    fixMode={fixMode}
                  />
                );
              })}
            </section>
          </section>
        ) : (
          <div className={styles.emptyWorkout}>Empty Wortout Data</div>
        )}
      </WorkoutModal>
      <GlowHeader
        title={"Start Workout"}
        style={{
          fontSize: "13vw",
          textAlign: "left",
          marginLeft: "15px",
        }}
      />
      <main>
        <article>
          <h2>Quick Start</h2>
          <button onClick={startWorkOut}>Start an Empty Workout</button>
        </article>
        <article>
          <h2>Check Records</h2>
          <input
            ref={dateRef}
            type="date"
            className={styles.dateInput}
            max={moment().format("YYYY-MM-DD")}
            onChange={getWorkoutData}
          />
        </article>
        <article>
          <LatestWorkout user={user} dateWorkout={dateWorkout} />
        </article>
      </main>
    </div>
  );
};

export default Main;
