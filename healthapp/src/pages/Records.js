import React, { useEffect, useState } from "react";
import styles from "./Records.module.css";
import { useHistory } from "react-router-dom";

const Records = () => {
  const history = useHistory();

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
        <input type="date" />
      </main>
    </div>
  );
};

export default Records;

// version 2 update contents

// {Object.keys(workouts).map((date) => {
//   return (
//     <section>
//       <h3>{date}</h3>
//       <section id={styles.workoutList}>
//         {workouts[date].map((workout, idx) => {
//           return (
//             <div style={{ marginTop: "20px" }}>
//               <div>{`Workout Num : ${idx}`}</div>
//               {workout.map((el) => {
//                 return (
//                   <div style={{ marginTop: "20px" }}>
//                     <div>{el[0].name}</div>
//                     {el.map((_) => {
//                       return (
//                         <div className={styles.record}>{`set ${
//                           _.set
//                         } : ${_.kg === null ? 0 : _.kg} kg x ${
//                           _.reps === null ? 0 : _.reps
//                         } reps`}</div>
//                       );
//                     })}
//                   </div>
//                 );
//               })}
//             </div>
//           );
//         })}
//       </section>
//     </section>
//   );
// })}
