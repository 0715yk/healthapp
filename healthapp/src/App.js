import "./App.css";
import { useState, useEffect } from "react";
import Main from "./pages/Main/Main";
import Landing from "./pages/Landing/Landing";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Record from "./pages/Record";
import Records from "./pages/Records";
import WorkOut from "./pages/WorkOut/WorkOut";
import { useRecoilState, useRecoilValue } from "recoil";
import { allWorkoutState, workoutState } from "./states";
import { db } from "./index";

function App() {
  const [user, setUser] = useState({ nickname: "" });
  const workouts = useRecoilValue(workoutState);
  const [allWorkouts, setallWorkouts] = useRecoilState(allWorkoutState);

  const getWorkoutData = async () => {
    var recordRef = await db.collection("records").doc(user.email);
    const result = {};
    recordRef
      .get()
      .then(function (querySnapshot) {
        if (querySnapshot.exists) {
          setallWorkouts(querySnapshot.data());
        } else {
          console.log("No such document!");
        }
      })
      .catch(function (error) {
        console.log("Error getting document:", error);
      });
  };

  useEffect(() => {
    if (user.email !== null || user.email !== undefined) getWorkoutData();
  }, [user, workouts]);

  return (
    <Router>
      <Switch>
        <Route path="/" exact>
          <Landing setUser={setUser} />
        </Route>
        <Route path="/main">
          <Main user={user} />
        </Route>
        <Route path="/record">
          <Record user={user} />
        </Route>
        <Route path="/records">
          <Records user={user} />
        </Route>
        <Route path="/workout">
          <WorkOut user={user} />
        </Route>
      </Switch>
    </Router>
  );
}

export default App;
