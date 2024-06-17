import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import apiRequest from "../../utils/utils";
import Header from "../../components/Header";
import Loader from "../../components/Loader"; // Assuming you have a Loader component

const JobProfile = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [job, setJob] = useState(null);
  const [loading, setLoading] = useState(true); // State to track loading state

  useEffect(() => {
    const fetchJobDetails = async () => {
      try {
        setLoading(true); // Start loading when API call begins
        const token = localStorage.getItem("token");
        const data = await apiRequest("GET", `/jobs/${id}`, null, {
          Authorization: `Bearer ${token}`,
        });
        setJob(data);
        setLoading(false); // Stop loading after successful API call
      } catch (error) {
        console.error("Failed to fetch job details", error);
        setLoading(false); // Stop loading in case of error
      }
    };

    fetchJobDetails();
  }, [id]);

  const handleApplyClick = () => {
    // Navigate to apply form page with job ID
    navigate(`/apply/${id}`); // Redirects to `/apply/:id` route
  };

  if (loading) {
    return <Loader />; // Display loader while fetching data
  }

  if (!job) {
    return <div>Error: Failed to fetch job details.</div>; // Handle error case
  }

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Fixed Header */}
      <Header />

      {/* Content */}
      <div className="flex p-6 mt-20">
        {/* Job Profile */}
        <div className="bg-white shadow-lg rounded-lg overflow-hidden transform hover:scale-103 transition-transform duration-200 w-full cursor-pointer">
          <div className="p-6">
            <h2 className="text-2xl font-semibold text-gray-900">
              {job.title}
            </h2>
            <p className="text-gray-500 mt-2">{job.company}</p>
            <p className="text-gray-500 mt-1">{job.location}</p>
            <p className="mt-4 text-gray-700">{job.description}</p>
            <div className="mt-6 flex justify-between items-center">
              <span className="text-primary text-lg font-medium">
                ${job.salary.toLocaleString()}
              </span>
              <span className="text-gray-400 text-sm">
                {new Date(job.createdAt).toLocaleDateString()}
              </span>
            </div>
            <hr />
            <div className="flex justify-end">
              <button
                onClick={handleApplyClick}
                className="mt-4 bg-primary text-white py-2 px-4 rounded-lg hover:bg-primary-dark transition-colors duration-300"
              >
                Apply
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default JobProfile;
