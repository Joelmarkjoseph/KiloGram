import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

import Home from "../pages/home";
import Gallery from "../pages/Gallery";
import About from "../pages/About";
import NavBar from "../Components/NavBar";
import Login from "../pages/Login";
import Signup from "../pages/Signup";

function App() {
  return (
    <>
      <Router>
        <NavBar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/gallery" element={<Gallery />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
        </Routes>
      </Router>
    </>
  );
}

export default App;
