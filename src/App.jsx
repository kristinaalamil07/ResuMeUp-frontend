import { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route, useLocation } from "react-router-dom";

// Pages
import Landing from "./pages/Landing";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Profile from "./pages/Profile";
import Navbar from "./components/Navbar";
import ResumeBuilderTemplate1 from "./pages/ResumeBuilderTemplate1";
import ResumeBuilderTemplate2 from "./pages/ResumeBuilderTemplate2";
import ResumeBuilderTemplate3 from "./pages/ResumeBuilderTemplate3";
import ResumeBuilderTemplate4 from "./pages/ResumeBuilderTemplate4";
import ResumeBuilderTemplate5 from "./pages/ResumeBuilderTemplate5";
import ResumeBuilderTemplate6 from "./pages/ResumeBuilderTemplate6";
import ResumeBuilderTemplate7 from "./pages/ResumeBuilderTemplate7";
import ResumeBuilderTemplate8 from "./pages/ResumeBuilderTemplate8";
import ResumeBuilderTemplate9 from "./pages/ResumeBuilderTemplate9";

// Sample users for initialization

function AppWrapper() {
  const [isLoggedIn, setIsLoggedIn] = useState(
    localStorage.getItem("isLoggedIn") === "true"
  );

  const location = useLocation();

  // Hide navbar on login and signup pages
  const hideNavbar = location.pathname === "/login" || location.pathname === "/signup";

  // Initialize sample users
  useEffect(() => {
    const users = JSON.parse(localStorage.getItem("users")) || [];
    if (users.length === 0) {
      localStorage.setItem("users", JSON.stringify(sampleUsers));
    }
  }, []);

  return (
    <>
      {!hideNavbar && <Navbar isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn} />}
      <Routes>
      <Route path="/" element={<Landing isLoggedIn={isLoggedIn} />} />
      <Route path="/login" element={<Login setIsLoggedIn={setIsLoggedIn} />} />
      <Route path="/signup" element={<Signup setIsLoggedIn={setIsLoggedIn} />} />
      <Route path="/profile" element={<Profile />} />
      {/* Resume Templates */}
        <Route
          path="/resume-builder-template1"
          element={<ResumeBuilderTemplate1 />}
        />
        <Route
          path="/resume-builder-template2"
          element={<ResumeBuilderTemplate2 />}
        />
        <Route
          path="/resume-builder-template3"
          element={<ResumeBuilderTemplate3 />}
        />
        <Route
          path="/resume-builder-template4"
          element={<ResumeBuilderTemplate4 />}
        />
        <Route
          path="/resume-builder-template5"
          element={<ResumeBuilderTemplate5 />}
        />
        <Route
          path="/resume-builder-template6"
          element={<ResumeBuilderTemplate6 />}
        />
        <Route
          path="/resume-builder-template7"
          element={<ResumeBuilderTemplate7 />}
        />
        <Route
          path="/resume-builder-template8"
          element={<ResumeBuilderTemplate8 />}
        />
        <Route
          path="/resume-builder-template9"
          element={<ResumeBuilderTemplate9 />}
        />
      </Routes>
    </>
  );
}

export default function App() {
  return (
    <Router>
      <AppWrapper />
    </Router>
  );
}
