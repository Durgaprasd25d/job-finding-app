import React from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import { Toaster } from "react-hot-toast";
import Login from "./pages/Login";
import Register from "./pages/Register";
import JobProfile from "./pages/job-board/JobProfile";
import AdminJobProfile from "./pages/admin/AdminJobProfile";
import JobApply from "./pages/job-board/JobApply";
import Profile from "./pages/job-board/Profile";
import RequireAuth from "./components/RequireAuth";
import RequireRole from "./components/RequiredRole"; // Import RequireRole component
import MainDashboard from "./pages/Dashboard";
import JobDashboard from "./pages/job-board/JobDashboard";
import AdminJobDashboard from "./pages/admin/AdminJobDashboard";
import AdminUpdateJob from "./pages/admin/AdminUpdateJob";
import AdminDashboard from "./pages/admin/AdminDashboard";
import AdminUserList from "./pages/admin/AdminUserList";
import NotFound from "./components/404"; // Import NotFound component
import { AuthProvider } from "./contexts/AuthContext";
import AdminCreateJobs from "./pages/admin/AdminCreateJobs";
import AdminApplies from "./pages/admin/AdminApplies";

function App() {
  return (
    <Router>
      <AuthProvider>
        <Toaster position="top-center" reverseOrder={false} />
        <Routes>
          {/* Public routes */}
          <Route path="/" element={<MainDashboard />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />

          {/* Protected routes */}
          <Route element={<RequireAuth />}>
            <Route element={<RequireRole role="user" />}>
              <Route path="/profile" element={<Profile />} />
              <Route path="/job-board" element={<JobDashboard />} />
              <Route path="/jobs/:id" element={<JobProfile />} />
              <Route path="/apply/:id" element={<JobApply />} />
            </Route>
          </Route>

          {/* Admin dashboard routes */}
          <Route element={<RequireAuth />}>
            <Route element={<RequireRole role="admin" />}>
              <Route path="/admin" element={<AdminDashboard />} />
              <Route path="/admin/create-jobs" element={<AdminCreateJobs />} />
              <Route path="/admin/jobs" element={<AdminJobDashboard />} />
              <Route path="/admin/jobs/:id" element={<AdminJobProfile />} />
              <Route path="/admin/jobs/:id/update" element={<AdminUpdateJob />} />
              <Route path="/admin/applies" element={<AdminApplies />} />
              <Route path="/admin/users" element={<AdminUserList />} />
            </Route>
          </Route>

          {/* 404 Not Found route */}
          <Route path="/404" element={<NotFound />} />
          <Route path="*" element={<Navigate to="/404" />} />
        </Routes>
      </AuthProvider>
    </Router>
  );
}

export default App;
