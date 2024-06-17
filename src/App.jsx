import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Toaster } from "react-hot-toast";
import Login from "./pages/Login";
import Register from "./pages/Register";
import JobDashboard from "./pages/job-board/JobDashboard";
import JobProfile from "./pages/job-board/JobProfile";
import JobApply from "./pages/job-board/JobApply";
import Profile from "./pages/job-board/Profile";
import Dashboard from "./pages/Dashboard";

function App() {
  return (
    <Router>
      <Toaster position="top-center" reverseOrder={false} />
      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/job-board" element={<JobDashboard />} />
        <Route path="/jobs/:id" element={<JobProfile />} />
        <Route path="/apply/:id" element={<JobApply />} />
        <Route path="/profile" element={<Profile />} />
      </Routes>
    </Router>
  );
}

export default App;
