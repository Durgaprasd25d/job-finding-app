import React, { useState, useEffect } from "react";
import AdminJobCard from "../admin/AdminJobCard";
import apiRequest from "../../utils/utils";
import Loader from "../../components/Loader";

const JobDashboard = () => {
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filters, setFilters] = useState({
    workMode: [],
    department: [],
    location: [],
  });

  useEffect(() => {
    const fetchJobs = async () => {
      try {
        const token = localStorage.getItem("token");
        const data = await apiRequest("GET", "/jobs", null, {
          Authorization: `Bearer ${token}`,
        });
        setJobs(data);
      } catch (error) {
        console.error("Failed to fetch job listings", error);
      } finally {
        setLoading(false); // Stop loading after API call (success or failure)
      }
    };

    fetchJobs();
  }, []);

  const handleFilterChange = (filterType, value) => {
    setFilters((prevFilters) => ({
      ...prevFilters,
      [filterType]: value,
    }));
  };

  if (loading) {
    return <Loader />; // Display Loader while fetching data
  }

  return (
    <div className="min-h-screen bg-gray-100">

      {/* Content */}
      <div className="flex p-6 mt-20">
        {" "}
        {/* Adjust top margin to account for fixed header */}
        {/* Sidebar for filters */}
        <aside className="w-1/4 bg-white mt-5 shadow-lg p-4 rounded-lg sticky top-0 h-full overflow-y-auto">
          <h2 className="text-2xl font-bold text-gray-800 mb-4">Filters</h2>
          <div className="mb-6">
            <h3 className="text-lg font-semibold text-gray-700 mb-2">
              Work mode
            </h3>
            <div className="space-y-2">
              <label className="flex items-center">
                <input
                  type="checkbox"
                  className="form-checkbox"
                  onChange={() => handleFilterChange("workMode", "office")}
                />
                <span className="ml-2">Work from office</span>
              </label>
              <label className="flex items-center">
                <input
                  type="checkbox"
                  className="form-checkbox"
                  onChange={() => handleFilterChange("workMode", "remote")}
                />
                <span className="ml-2">Remote</span>
              </label>
              <label className="flex items-center">
                <input
                  type="checkbox"
                  className="form-checkbox"
                  onChange={() => handleFilterChange("workMode", "hybrid")}
                />
                <span className="ml-2">Hybrid</span>
              </label>
            </div>
          </div>
          <div className="mb-6">
            <h3 className="text-lg font-semibold text-gray-700 mb-2">
              Department
            </h3>
            <div className="space-y-2">
              <label className="flex items-center">
                <input
                  type="checkbox"
                  className="form-checkbox"
                  onChange={() =>
                    handleFilterChange("department", "engineering")
                  }
                />
                <span className="ml-2">Engineering - Software</span>
              </label>
              <label className="flex items-center">
                <input
                  type="checkbox"
                  className="form-checkbox"
                  onChange={() => handleFilterChange("department", "ux_design")}
                />
                <span className="ml-2">UX, Design & Architecture</span>
              </label>
              <label className="flex items-center">
                <input
                  type="checkbox"
                  className="form-checkbox"
                  onChange={() => handleFilterChange("department", "marketing")}
                />
                <span className="ml-2">Marketing & Communication</span>
              </label>
            </div>
          </div>
          <div className="mb-6">
            <h3 className="text-lg font-semibold text-gray-700 mb-2">
              Location
            </h3>
            <div className="space-y-2">
              <label className="flex items-center">
                <input
                  type="checkbox"
                  className="form-checkbox"
                  onChange={() => handleFilterChange("location", "bhubaneswar")}
                />
                <span className="ml-2">Bhubaneswar</span>
              </label>
              <label className="flex items-center">
                <input
                  type="checkbox"
                  className="form-checkbox"
                  onChange={() => handleFilterChange("location", "cuttack")}
                />
                <span className="ml-2">Cuttack</span>
              </label>
              <label className="flex items-center">
                <input
                  type="checkbox"
                  className="form-checkbox"
                  onChange={() => handleFilterChange("location", "delhi")}
                />
                <span className="ml-2">Delhi / NCR</span>
              </label>
            </div>
          </div>
        </aside>
        {/* Job listings */}
        <div className="flex-1 overflow-y-auto p-6">
          <div className="grid grid-cols-1 gap-6">
            {jobs.map((job) => (
              <AdminJobCard key={job._id} job={job} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default JobDashboard;
