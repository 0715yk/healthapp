import "./App.css";
import Main from "./pages/Main/Main";
import Landing from "./pages/Landing/Landing";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import NavBar from "./components/NavBar";
import Profile from "./pages/Profile";

function App() {
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
