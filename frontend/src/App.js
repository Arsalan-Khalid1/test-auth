import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Home from "./components/Home.jsx";
import NationalInsights from "./components/NationalInsights";
import LocalInisghts from "./components/LocalInisghts";
import ForgotPassword from "./pages/ForgotPassword";

function App() {
  return (
    <>
      <Router>
        <div>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/forgot-password" element={<ForgotPassword />} />
            <Route path="/home" element={<Home />} />
            <Route path="/national" element={<NationalInsights />} />
            <Route path="/local" element={<LocalInisghts />} />
          </Routes>
        </div>
      </Router>
      <ToastContainer />
    </>
  );
}

export default App;
