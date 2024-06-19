import React, { useState } from "react";
import apiRequest from "../../utils/utils";
import { useNavigate } from "react-router-dom";
import AdminHeader from "../../components/AdminHeader";
import Loader from "../../components/Loader";
import { toast } from "react-hot-toast";

const CreateJobForm = () => {
  const navigate = useNavigate();
  const initialJobState = {
    title: "",
    description: "",
    company: "",
    location: "",
    salary: "",
  };

  const [job, setJob] = useState(initialJobState);
  const [loading, setLoading] = useState(false);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setJob({ ...job, [name]: value });
  };

  const handleCreateJob = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      const token = localStorage.getItem("token");
      const response = await apiRequest("POST", "/jobs", job, {
        Authorization: `Bearer ${token}`,
      });
      console.log("Job created:", response);
      setJob(initialJobState);
      setLoading(false);
      toast.success("Job Created");
      navigate("/admin/jobs");
    } catch (error) {
      setLoading(false);
      toast.error(error.message);
      console.error("Error creating job:", error);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col">
      <AdminHeader />
      <div
        className="flex-grow flex items-center justify-center"
        style={{ marginTop: "80px" }}
      >
        {loading ? (
          <Loader />
        ) : (
          <div className="w-full max-w-md p-8 space-y-8 bg-white rounded-lg shadow-lg">
            <h2 className="text-3xl font-bold text-center text-primary">
              Create Job
            </h2>
            <form onSubmit={handleCreateJob} className="mt-8 space-y-6">
              <div className="rounded-md shadow-sm space-y-4">
                <div>
                  <label
                    htmlFor="title"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Title
                  </label>
                  <input
                    type="text"
                    id="title"
                    name="title"
                    value={job.title}
                    onChange={handleInputChange}
                    required
                    className="relative block w-full px-4 py-3 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-md focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary sm:text-sm"
                  />
                </div>
                <div>
                  <label
                    htmlFor="description"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Description
                  </label>
                  <textarea
                    id="description"
                    name="description"
                    value={job.description}
                    onChange={handleInputChange}
                    rows={3}
                    required
                    className="relative block w-full px-4 py-3 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-md focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary sm:text-sm"
                  />
                </div>
                <div>
                  <label
                    htmlFor="company"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Company
                  </label>
                  <input
                    type="text"
                    id="company"
                    name="company"
                    value={job.company}
                    onChange={handleInputChange}
                    required
                    className="relative block w-full px-4 py-3 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-md focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary sm:text-sm"
                  />
                </div>
                <div>
                  <label
                    htmlFor="location"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Location
                  </label>
                  <input
                    type="text"
                    id="location"
                    name="location"
                    value={job.location}
                    onChange={handleInputChange}
                    required
                    className="relative block w-full px-4 py-3 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-md focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary sm:text-sm"
                  />
                </div>
                <div>
                  <label
                    htmlFor="salary"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Salary
                  </label>
                  <input
                    type="number"
                    id="salary"
                    name="salary"
                    value={job.salary}
                    onChange={handleInputChange}
                    required
                    className="relative block w-full px-4 py-3 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-md focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary sm:text-sm"
                  />
                </div>
              </div>

              <div className="flex justify-end">
                <button
                  type="submit"
                  className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-primary hover:bg-primary-dark focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary"
                >
                  Create Job
                </button>
              </div>
            </form>
          </div>
        )}
      </div>
    </div>
  );
};

export default CreateJobForm;
