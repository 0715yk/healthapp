export const finishWorkout = async () => {
  var recordRef = await db.collection("yongkiniiii@gmail.com").doc("20220613");

  recordRef.get().then((doc) => {
    if (doc.exists) console.log(doc.data());
    else console.log(doc);
  });

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

  const date = moment().format("YYYY/MM/DD");
  var recordRef = await db
    .collection("records")
    .doc(user.email)
    .collection(date);

  recordRef
    .get()
    .then((doc) => {
      db.collection("records").doc(user.email).collection(date).set("test");
      console.log(doc);
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
