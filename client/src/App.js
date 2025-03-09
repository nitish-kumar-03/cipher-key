import "./App.css";
import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home.jsx";
import Passwords from "./pages/Passwords.jsx";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/passwords" element={<Passwords />} />
    </Routes>
  );
}

export default App;
