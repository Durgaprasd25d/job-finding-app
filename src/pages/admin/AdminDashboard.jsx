import React, { useState, useEffect } from "react";
import apiRequest from "../../utils/utils";
import { Link } from "react-router-dom";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

const AdminDashboard = () => {
  const [jobStats, setJobStats] = useState([]);
  const [jobCount, setJobCount] = useState(0);
  const [userCount, setUserCount] = useState(0);
  const [isAdmin, setIsAdmin] = useState(false); 

  useEffect(() => {
    const fetchData = async () => {
      try {
        const token = localStorage.getItem("token");
        if (!token) throw new Error("No auth token found");

        const userData = await apiRequest("GET", "/auth/profile", null, {
          Authorization: `Bearer ${token}`,
        });

        if (userData.role === "admin") {
          setIsAdmin(true);

          // Fetch jobs and users simultaneously
          const [jobs, users] = await Promise.all([
            apiRequest("GET", "/jobs", null, { Authorization: `Bearer ${token}` }),
            apiRequest("GET", "/auth/users", null, { Authorization: `Bearer ${token}` }), // Fetch users
          ]);

          // Group jobs and users by date
          const jobsByDate = groupByDate(jobs, "createdAt");
          const usersByDate = groupByDate(users, "createdAt");

          // Format data for LineChart
          const formattedData = Object.keys(jobsByDate).map((date) => ({
            formattedCreatedAt: date,
            jobCount: jobsByDate[date].length,
            jobTitles: jobsByDate[date].map(job => job.title).join(", "), // Concatenate job titles
            userCount: usersByDate[date] ? usersByDate[date].length : 0,
            userNames: usersByDate[date] ? usersByDate[date].map(user => user.name).join(", ") : "", // Concatenate user names
          }));

          setJobStats(formattedData);
          setJobCount(jobs.length);
          setUserCount(users.length);
        } else {
          alert("Access Denied: You are not authorized to view this page.");
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  // Function to group data by date
  const groupByDate = (data, dateField) => {
    const groupedData = {};
    data.forEach((item) => {
      const date = new Date(item[dateField]).toISOString().split("T")[0]; // Extract YYYY-MM-DD
      if (groupedData[date]) {
        groupedData[date].push(item);
      } else {
        groupedData[date] = [item];
      }
    });
    return groupedData;
  };

  return isAdmin ? (
    <div className="min-h-screen bg-gray-100">
      <div className="max-w-7xl mx-auto px-4 py-8 sm:px-6 lg:px-8">
        <div>
          <h1 className="text-3xl font-bold text-gray-800">Admin Dashboard</h1>
          <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="bg-white rounded-lg shadow-md p-6">
              <h2 className="text-xl font-semibold text-gray-800">Total Jobs</h2>
              <Link to="/admin/jobs">
                <p className="text-4xl font-bold text-primary">{jobCount}</p>
              </Link>
            </div>
            <div className="bg-white rounded-lg shadow-md p-6">
              <h2 className="text-xl font-semibold text-gray-800">Total Users</h2>
              <Link to="/admin/users">
                <p className="text-4xl font-bold text-primary">{userCount}</p>
              </Link>
            </div>
          </div>
          <div className="mt-6">
            <h2 className="text-xl font-semibold text-gray-800">Jobs and Users Over Time</h2>
            <div className="bg-white rounded-lg shadow-md mt-4 p-6">
              <ResponsiveContainer width="100%" height={400}>
                <LineChart
                  data={jobStats}
                  margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
                >
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="formattedCreatedAt" label={{ value: 'Date', position: 'insideBottomRight', offset: 0 }} />
                  <YAxis label={{ value: 'Count', angle: -90, position: 'insideLeft' }} />
                  <Tooltip
                    contentStyle={{ backgroundColor: "#f5f5f5", border: "1px solid #ccc" }}
                    labelStyle={{ fontWeight: "bold", color: "#333" }}
                    formatter={(value) => `${value}`}
                    labelFormatter={(value) => `Date: ${value}`} // Custom label formatter
                  />
                  <Legend />
                  <Line
                    type="monotone"
                    dataKey="jobCount"
                    name="Job Count"
                    stroke="#8884d8"
                    strokeWidth={2}
                    dot={{ stroke: "#8884d8", fill: "#8884d8" }}
                    connectNulls // Ensure lines connect even when no data is available
                  />
                  <Line
                    type="monotone"
                    dataKey="userCount"
                    name="User Count"
                    stroke="#82ca9d"
                    strokeWidth={2}
                    dot={{ stroke: "#82ca9d", fill: "#82ca9d" }}
                    connectNulls // Ensure lines connect even when no data is available
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>
      </div>
    </div>
  ) : null;
};

export default AdminDashboard;
