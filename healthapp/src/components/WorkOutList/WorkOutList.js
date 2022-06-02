import React, { useMemo, useState } from "react";
import styles from "./WorkOutList.module.css";
import { useHistory } from "react-router-dom";
import PureWorkOut from "../PureWorkOut/PureWorkOut";
import { db } from "../../index";
import moment from "moment";
import Modal from "../Modal/Modal";
import { useRecoilValue } from "recoil";
import { workoutState } from "../../states";

const WorkOutList = ({ user }) => {
  const workouts = useRecoilValue(workoutState);
  const [nullCheckListErrorOn, setNullCheckListErrorOn] = useState(false);
  const history = useHistory();
  const finishWorkout = async () => {
    if (workouts.length === 0) {
      setNullCheckListErrorOn((prev) => !prev);
      return;
    }
    // kg : null & reps: null 인것들 필터링
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

    const date = moment().format("YYYY/MM/DD");
    var recordRef = await db.collection("records").doc(user.email);

    recordRef
      .get()
      .then((doc) => {
        if (doc.exists) {
          const data = doc.data()[date];
          if (data) {
            data.push(JSON.stringify(copyArr));
            recordRef.set(
              {
                [date]: data,
              },
              { merge: true }
            );
          } else {
            recordRef.set(
              {
                [date]: [JSON.stringify(copyArr)],
              },
              { merge: true }
            );
          }
        } else {
          db.collection("records")
            .doc(user.email)
            .set(
              {
                [date]: [JSON.stringify(copyArr)],
              },
              { merge: true }
            );
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
          message: "하나 이상의 루틴을 실행해 주세요",
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
