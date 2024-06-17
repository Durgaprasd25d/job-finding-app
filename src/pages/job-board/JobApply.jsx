import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import Header from "../../components/Header";
import apiRequest from "../../utils/utils";
import { toast } from "react-hot-toast";
import Loader from "../../components/Loader"; // Import the Loader component

const JobApply = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [job, setJob] = useState({});
  const [formData, setFormData] = useState({
    coverLetter: "",
    resume: "",
    name: "",
    email: "",
    number: "",
  });
  const [loading, setLoading] = useState(true); // State to track loading state
  const [submitting, setSubmitting] = useState(false); // State to track submission state

  useEffect(() => {
    const fetchJob = async () => {
      try {
        setLoading(true); // Start loading
        const token = localStorage.getItem("token");
        const data = await apiRequest("GET", `/jobs/${id}`, null, {
          Authorization: `Bearer ${token}`,
        });
        setJob(data);
      } catch (error) {
        console.log("Failed to fetch job", error);
      } finally {
        setLoading(false); // Stop loading after API call (success or failure)
      }
    };
    fetchJob();
  }, [id]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setSubmitting(true); // Start submitting
      const token = localStorage.getItem("token");
      await apiRequest("POST", `/applications/${id}`, formData, {
        Authorization: `Bearer ${token}`,
      });
      toast.success("Job applied successfully! Thank you.");
      navigate("/job-board");
    } catch (error) {
      if (
        error.response &&
        error.response.data &&
        error.response.data.message
      ) {
        toast.error(error.response.data.message);
      } else {
        toast.error("Failed to submit application. Please try again later.");
      }
      console.error("Failed to submit application", error);
    } finally {
      setSubmitting(false); // Stop submitting
    }
  };

  if (loading) {
    return <Loader />; // Display Loader while fetching job details
  }

  if (!job.title) {
    return <div>Loading...</div>; // Fallback if job details are not available
  }

  return (
    <>
      <div className="min-h-screen bg-gray-100">
        {/* Fixed Header */}
        <Header />

        {/* Content */}
        <div className="flex p-6 mt-20">
          {/* Job Apply Form */}
          <div className="bg-white shadow-lg rounded-lg overflow-hidden transform hover:scale-103 transition-transform duration-200 w-full cursor-pointer">
            <div className="p-6">
              <h2 className="text-2xl font-semibold text-gray-900">
                Apply for Job: {job.title}
              </h2>
              <p className="text-gray-700 mt-4">{job.description}</p>
              <form onSubmit={handleSubmit} className="mt-6 space-y-6">
                {/* Resume */}
                <div>
                  <label
                    htmlFor="resume"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Resume URL
                  </label>
                  <input
                    id="resume"
                    name="resume"
                    type="text"
                    required
                    value={formData.resume}
                    onChange={handleInputChange}
                    className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                    placeholder="Enter your resume URL"
                  />
                </div>
                {/* Name */}
                <div>
                  <label
                    htmlFor="name"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Full Name
                  </label>
                  <input
                    id="name"
                    name="name"
                    type="text"
                    autoComplete="name"
                    required
                    value={formData.name}
                    onChange={handleInputChange}
                    className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                    placeholder="Enter your full name"
                  />
                </div>
                {/* Email */}
                <div>
                  <label
                    htmlFor="email"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Email Address
                  </label>
                  <input
                    id="email"
                    name="email"
                    type="email"
                    autoComplete="email"
                    required
                    value={formData.email}
                    onChange={handleInputChange}
                    className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                    placeholder="Enter your email address"
                  />
                </div>
                {/* Phone Number */}
                <div>
                  <label
                    htmlFor="number"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Phone Number
                  </label>
                  <input
                    id="number"
                    name="number"
                    type="tel"
                    autoComplete="tel"
                    required
                    value={formData.number}
                    onChange={handleInputChange}
                    className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                    placeholder="Enter your phone number"
                  />
                </div>
                {/* Cover Letter */}
                <div>
                  <label
                    htmlFor="coverLetter"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Cover Letter
                  </label>
                  <textarea
                    id="coverLetter"
                    name="coverLetter"
                    rows="4"
                    required
                    value={formData.coverLetter}
                    onChange={handleInputChange}
                    className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                    placeholder="Write your cover letter..."
                  ></textarea>
                </div>
                {/* Submit Button */}
                <div className="flex justify-end">
                  <button
                    type="submit"
                    className="mt-4 bg-primary text-white py-2 px-4 rounded-lg hover:bg-primary-dark transition-colors duration-300 focus:outline-none"
                  >
                    Submit Application
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>

      {/* Loader during form submission */}
      {submitting && <Loader />} 
    </>
  );
};

export default JobApply;
