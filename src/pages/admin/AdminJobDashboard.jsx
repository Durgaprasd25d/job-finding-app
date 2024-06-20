import React, { useState, useEffect } from "react";
import AdminJobCard from "../admin/AdminJobCard";
import apiRequest from "../../utils/utils";
import Loader from "../../components/Loader";
import Pagination from "../../components/Pagination";
import AdminHeader from '../../components/AdminHeader';
import FilterComponent from "../../components/FilterComponent";

const AdminJobDashboard = () => {
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [jobsPerPage] = useState(3); // Number of jobs per page
  const [filters, setFilters] = useState({
    title: "",
    location: "",
    company: "",
    salaryMin: "",
    salaryMax: "",
    sortField: "salary",
    sortOrder: "ascending"
  });

  useEffect(() => {
    const fetchJobs = async () => {
      try {
        const token = localStorage.getItem("token");

        // Convert filters to query string
        const query = new URLSearchParams(filters).toString();
        const data = await apiRequest("GET", `/jobs?${query}`, null, {
          Authorization: `Bearer ${token}`,
        });

        // Sort jobs
        const sortedJobs = data.sort((a, b) => {
          if (filters.sortField === "salary") {
            return filters.sortOrder === "ascending" ? a.salary - b.salary : b.salary - a.salary;
          } else if (filters.sortField === "freshness" || filters.sortField === "relevance") {
            return new Date(b.createdAt) - new Date(a.createdAt); // Sort by job creation date
          }
          return 0;
        });

        setJobs(sortedJobs);
      } catch (error) {
        console.error("Failed to fetch job listings", error);
      } finally {
        setLoading(false); // Stop loading after API call (success or failure)
      }
    };

    fetchJobs();
  }, [filters]);

  const handleFilterChange = (filterType, value) => {
    if (filterType !== "salaryMin" && filterType !== "salaryMax") {
      setLoading(true);
    }
    setFilters((prevFilters) => ({
      ...prevFilters,
      [filterType]: value,
    }));
  };

  const handleSortChange = (field, order = "ascending") => {
    setLoading(true);
    setFilters((prevFilters) => ({
      ...prevFilters,
      sortField: field,
      sortOrder: order,
    }));
  };

  const handleSalaryKeyDown = (e) => {
    if (e.key === 'Enter') {
      setFilters((prevFilters) => ({
        ...prevFilters,
        salaryMin: e.target.name === 'salaryMin' ? e.target.value : prevFilters.salaryMin,
        salaryMax: e.target.name === 'salaryMax' ? e.target.value : prevFilters.salaryMax,
      }));
    }
  };

  const clearFilters = () => {
    setLoading(true);
    setFilters({
      title: "",
      location: "",
      company: "",
      salaryMin: "",
      salaryMax: "",
      sortField: "salary",
      sortOrder: "ascending"
    });
  };

  // Calculate the current jobs
  const indexOfLastJob = currentPage * jobsPerPage;
  const indexOfFirstJob = indexOfLastJob - jobsPerPage;
  const currentJobs = jobs.slice(indexOfFirstJob, indexOfLastJob);

  const totalPages = Math.ceil(jobs.length / jobsPerPage);

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Fixed Header */}
      <AdminHeader />
      {/* Content */}
      <div className="flex p-6 mt-20">
        {/* Adjust top margin to account for fixed header */}
        {/* Sidebar for filters */}
        <FilterComponent
          filters={filters}
          onFilterChange={handleFilterChange}
          onSortChange={handleSortChange}
          onClearFilters={clearFilters}
          onSalaryKeyDown={handleSalaryKeyDown}
        />
        {/* Job listings */}
        <div className="flex-1 overflow-y-auto p-6">
          {loading ? (
            <Loader /> // Display Loader while fetching data
          ) : currentJobs.length === 0 ? (
            <div className="text-center text-gray-500">No results found</div>
          ) : (
            <div className="grid grid-cols-1 gap-6">
              {currentJobs.map((job) => (
                <AdminJobCard key={job._id} job={job} />
              ))}
            </div>
          )}
          {totalPages > 1 && (
            <Pagination
              currentPage={currentPage}
              totalPages={totalPages}
              onPageChange={setCurrentPage}
            />
          )}
        </div>
      </div>
    </div>
  );
};

export default AdminJobDashboard;
