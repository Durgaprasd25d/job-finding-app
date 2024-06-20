import React, { useState, useEffect } from "react";
import JobCard from "../job-board/JobCard";
import apiRequest from "../../utils/utils";
import Loader from "../../components/Loader";
import Pagination from "../../components/Pagination";
import Header from "../../components/Header";
import FilterComponent from "../../components/FilterComponent";

const JobDashboard = () => {
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
    sortOrder: "ascending",
    searchQuery: ""
  });

  useEffect(() => {
    const fetchJobs = async () => {
      setLoading(true); // Start loading indicator

      try {
        // Convert filters to query string
        const query = new URLSearchParams(filters).toString();
        const data = await apiRequest("GET", `/jobs?${query}`);

        // Sort jobs based on filters
        const sortedJobs = sortJobs(data, filters.sortField, filters.sortOrder);

        // Filter jobs based on search query
        const filteredJobs = filterJobs(sortedJobs, filters.searchQuery);

        setJobs(filteredJobs);
      } catch (error) {
        console.error("Failed to fetch job listings", error);
      } finally {
        setLoading(false); // Stop loading indicator
      }
    };

    fetchJobs();
  }, [filters]); // Re-fetch jobs when filters change

  const sortJobs = (jobs, sortField, sortOrder) => {
    return jobs.sort((a, b) => {
      if (sortField === "salary") {
        return sortOrder === "ascending" ? a.salary - b.salary : b.salary - a.salary;
      } else if (sortField === "freshness" || sortField === "relevance") {
        return new Date(b.createdAt) - new Date(a.createdAt);
      }
      return 0;
    });
  };

  const filterJobs = (jobs, searchQuery) => {
    return jobs.filter(job =>
      job.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      job.location.toLowerCase().includes(searchQuery.toLowerCase()) ||
      job.company.toLowerCase().includes(searchQuery.toLowerCase())
    );
  };

  const handleFilterChange = (filterType, value) => {
    setFilters(prevFilters => ({
      ...prevFilters,
      [filterType]: value
    }));
  };

  const handleSortChange = (field, order = "ascending") => {
    setFilters(prevFilters => ({
      ...prevFilters,
      sortField: field,
      sortOrder: order
    }));
  };

  const handleSalaryKeyDown = (e) => {
    if (e.key === 'Enter') {
      setFilters(prevFilters => ({
        ...prevFilters,
        salaryMin: e.target.name === 'salaryMin' ? e.target.value : prevFilters.salaryMin,
        salaryMax: e.target.name === 'salaryMax' ? e.target.value : prevFilters.salaryMax
      }));
    }
  };

  const handleSearch = (searchQuery) => {
    setFilters(prevFilters => ({
      ...prevFilters,
      searchQuery: searchQuery.trim()
    }));
  };

  const clearFilters = () => {
    setFilters({
      title: "",
      location: "",
      company: "",
      salaryMin: "",
      salaryMax: "",
      sortField: "salary",
      sortOrder: "ascending",
      searchQuery: ""
    });
  };

  // Calculate the current jobs
  const indexOfLastJob = currentPage * jobsPerPage;
  const indexOfFirstJob = indexOfLastJob - jobsPerPage;
  const currentJobs = jobs.slice(indexOfFirstJob, indexOfLastJob);

  const totalPages = Math.ceil(jobs.length / jobsPerPage);

  if (loading) {
    return <Loader />; // Display Loader while fetching data
  }

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Fixed Header */}
      <Header onSearch={handleSearch} searchQuery={filters.searchQuery} />
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
          onSearch={handleSearch}
        />
        {/* Job listings */}
        <div className="flex-1 overflow-y-auto p-6">
          {currentJobs.length === 0 ? (
            <div className="text-center text-gray-500">No results found</div>
          ) : (
            <div className="grid grid-cols-1 gap-6">
              {currentJobs.map((job) => (
                <JobCard key={job._id} job={job} />
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

export default JobDashboard;
