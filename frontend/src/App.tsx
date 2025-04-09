import "./App.css";
import { Routes, Route } from "react-router";
import Home from "./screens/Home";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="login" element={<Home />} />
    </Routes>
  );
}

export default App;
