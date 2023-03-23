import "./App.css";
import Main from "./pages/Main/Main";
import Landing from "./pages/Landing/Landing";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import NavBar from "./components/NavBar";
import Profile from "./pages/Profile";
import axios from "axios";
import { useEffect } from "react";

function App() {
  useEffect(() => {
    axios
      .post("http://api.localhost:4000/users", {
        id: "hyk1993",
        lastName: "6248579a",
      })
      .then(function (response) {
        console.log(response);
      })
      .catch(function (error) {
        console.log(error);
      });
  }, []);

  return (
    <BrowserRouter>
      <NavBar>
        <Routes>
          <Route path="/" element={<Landing />} />
          <Route path="/main/*" element={<Main />} />
          <Route path="/about" element={<div>about</div>} />
          <Route path="/profile" element={<Profile />} />
        </Routes>
      </NavBar>
    </BrowserRouter>
  );
}

export default App;
