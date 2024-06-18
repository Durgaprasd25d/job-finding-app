import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Toaster } from "react-hot-toast";
import Login from "./pages/Login";
import Register from "./pages/Register";
import JobProfile from "./pages/job-board/JobProfile";
import AdminJobProfile from "./pages/admin/AdminJobProfile";
import JobApply from "./pages/job-board/JobApply";
import Profile from "./pages/job-board/Profile";
import RequireAuth from "./components/RequireAuth";
import MainDashboard from "./pages/Dashboard";
import JobDashboard from "./pages/job-board/JobDashboard";
import AdminJobDashboard from "./pages/admin/AdminJobDashboard";
import AdminDashboard from "./pages/admin/AdminDashboard";
import AdminUserList from "./pages/admin/AdminUserList";
import { AuthProvider } from "./contexts/AuthContext";

function App() {
  return (
    <Router>
      <AuthProvider> {/* Wrap entire app with AuthProvider */}
        <Toaster position="top-center" reverseOrder={false} />
        <Routes>
          {/* Public routes */}
          <Route path="/" element={<MainDashboard />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />

          {/* Protected routes */}
          <Route element={<RequireAuth />}>
            <Route path="/job-board" element={<JobDashboard />} /> {/* User */}
            <Route path="/jobs/:id" element={<JobProfile />} />
            <Route path="/apply/:id" element={<JobApply />} />
            <Route path="/profile" element={<Profile />} />
          </Route>

          {/* Admin dashboard routes */}
          <Route element={<RequireAuth />}> {/* Ensure RequireAuth is used for admin routes */}
            <Route path="/admin" element={<AdminDashboard />} />
            <Route path="/admin/jobs" element={<AdminJobDashboard />} /> {/* Admin job list */}
            <Route path="/admin/jobs/:id" element={<AdminJobProfile />} /> {/* Admin job profile */}
            <Route path="/admin/users" element={<AdminUserList />} /> {/* Admin user list */}
          </Route>
        </Routes>
      </AuthProvider>
    </Router>
  );
}

export default App;
