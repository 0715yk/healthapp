import React, { useMemo, useState } from "react";
import styles from "./WorkOutList.module.css";
import { useHistory } from "react-router-dom";
import PureWorkOut from "../PureWorkOut/PureWorkOut";
import { db } from "../../index";
import moment from "moment";
import Modal from "../Modal/Modal";
import { useRecoilValue, useRecoilState } from "recoil";
import { workoutState, timeState } from "../../states";

const WorkOutList = ({ user }) => {
  const workouts = useRecoilValue(workoutState);
  const [time, setTime] = useRecoilState(timeState);
  const [nullCheckListErrorOn, setNullCheckListErrorOn] = useState(false);
  const history = useHistory();

  const finishWorkout = async () => {
    if (!user.email) return;

    if (workouts.length === 0) {
      setNullCheckListErrorOn((prev) => !prev);
      return;
    }
    setTime({ ...time, endTime: moment() });

    let copyArr = workouts.slice();
    var idx = 0;

    for (let arr of copyArr) {
      arr = arr.filter((el) => {
        if (el.kg === null || el.reps === null) return false;
        else return true;
      });
      copyArr[idx] = arr;
      idx++;
    }

    copyArr = copyArr.filter((el) => el.length !== 0);
    if (copyArr.length === 0) {
      setNullCheckListErrorOn((prev) => !prev);
      return;
    }

    const date = moment().format("YYYYMMDD");
    var recordRef = await db.collection(user.email).doc(date);

    recordRef
      .get()
      .then((doc) => {
        if (doc.exists) {
          const data = doc.data();
          const finalKey = parseInt(
            Object.keys(data)[Object.keys(data).length - 2]
          );
          if (!isNaN(finalKey + 1))
            recordRef.set(
              {
                order: date,
                [finalKey + 1]: JSON.stringify(copyArr),
              },
              { merge: true }
            );
          else
            db.collection(user.email)
              .doc(date)
              .set(
                { order: date, 0: JSON.stringify(copyArr) },
                { merge: true }
              );
        } else {
          db.collection(user.email)
            .doc(date)
            .set({ order: date, 0: JSON.stringify(copyArr) }, { merge: true });
        }
      })
      .catch((error) => {
        console.log("Error getting document:", error);
      });
    history.push("/record");
  };

  const closeModal = () => {
    setNullCheckListErrorOn((prev) => !prev);
  };

  return (
    <div className={styles.writeFunc}>
      <Modal
        modalOn={{
          on: nullCheckListErrorOn,
          message: "?????? ????????? ????????? ????????? ?????????",
        }}
        closeModal={closeModal}
      />
      <main>
        <section>
          {workouts.map((workout, idx) => {
            return <PureWorkOut key={idx} workoutList={workout} idx={idx} />;
          })}
        </section>
        <section className={styles.doneBtnPart}>
          <button className={styles.glowBtn} onClick={finishWorkout}></button>
        </section>
      </main>
    </div>
  );
};

export default WorkOutList;
