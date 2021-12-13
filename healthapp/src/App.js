import "./App.css";
import { useState } from "react";
import Main from "./pages/Main/Main";
import Landing from "./pages/Landing/Landing";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Record from "./pages/Record";
import Records from "./pages/Records";
import WorkOut from "./pages/WorkOut/WorkOut";

function App() {
  const [startTime, setStartTime] = useState("");
  const [user, setUser] = useState({ nickname: "" });
  const [checkList, setCheckList] = useState({});
  return (
    <Router>
      <Switch>
        <Route path="/" exact>
          <Landing setUser={setUser} setStartTime={setStartTime} />
        </Route>
        <Route path="/main">
          <Main user={user} />
        </Route>
        <Route path="/record">
          <Record startTime={startTime} />
        </Route>
        <Route path="/records">
          <Records />
        </Route>
        <Route path="/workout">
          <WorkOut setCheckList={setCheckList} checkList={checkList} />
        </Route>
      </Switch>
    </Router>
  );
}

export default App;
