import React, { useState } from "react";
import styles from "./WriteFunc.module.css";
import { useHistory } from "react-router-dom";
import PureWorkOut from "../PureWorkOut/PureWorkOut";

const WriteFunc = ({ checkList, setCheckList }) => {
  const history = useHistory();
  const finishWorkout = () => {
    history.push("/record");
  };

  return (
    <div className={styles.writeFunc}>
      <main>
        <section>
          {Object.keys(checkList).map((workout, idx) => {
            return (
              <PureWorkOut
                workout={workout}
                idx={idx}
                checkList={checkList}
                setCheckList={setCheckList}
              />
            );
          })}
        </section>
        <section className={styles.doneBtnPart}>
          <button className={styles.glowBtn} onClick={finishWorkout}></button>
        </section>
      </main>
    </div>
  );
};

export default WriteFunc;
