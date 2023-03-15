import "./App.css";
import Main from "./pages/Main/Main";
import Landing from "./pages/Landing/Landing";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Record from "./pages/Record";
import WorkOut from "./pages/WorkOut/WorkOut";
import WorkoutModal from "./components/WorkoutModal";
import NavBar from "./components/NavBar";

function App() {
  return (
    <NavBar>
      <Router>
        <Switch>
          <Route path="/" exact>
            <Landing />
          </Route>
          <Route path="/main">
            <Main />
          </Route>
          <Route path="/record">
            <Record />
          </Route>
          <Route path="/records">
            <WorkoutModal />
          </Route>
          <Route path="/workout">
            <WorkOut />
          </Route>
        </Switch>
      </Router>
    </NavBar>
  );
}

export default App;
