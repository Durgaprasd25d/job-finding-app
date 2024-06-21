import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import Loader from "../../components/Loader";
import apiRequest from "../../utils/utils";
import axios from "axios";
import AdminHeader from "../../components/AdminHeader";

const AdminJobProfile = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [job, setJob] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchJobDetails = async () => {
      try {
        setLoading(true);
        const token = localStorage.getItem("token");
        const data = await apiRequest("GET", `/jobs/${id}`, null, {
          Authorization: `Bearer ${token}`,
        });
        setJob(data);
        setLoading(false);
      } catch (error) {
        console.error("Failed to fetch job details", error);
        setLoading(false);
      }
    };

    fetchJobDetails();
  }, [id]);

  const handleEdit = () => {
    navigate(`/admin/jobs/${id}/update`);
  };

  const handleDelete = async () => {
    try {
      const token = localStorage.getItem("token");
      await axios.delete(`https://job-board-backend-55t1.onrender.com/jobs/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      navigate(`/admin/jobs`);
    } catch (error) {
      console.error("Failed to delete job", error);
    }
  };

  if (loading) {
    return <Loader />;
  }

  if (!job) {
    return <div>Error: Failed to fetch job details.</div>;
  }

  return (
    <div className="min-h-screen bg-gray-100">
      <AdminHeader/>
      <div className="flex p-6 mt-20">
        <div className="bg-white shadow-lg rounded-lg overflow-hidden transform hover:scale-103 transition-transform duration-200 w-full cursor-pointer">
          <div className="p-6">
            <h2 className="text-2xl font-semibold text-gray-900">{job.title}</h2>
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
                onClick={handleEdit}
                className="mr-2 m-4 bg-primary text-white py-2 px-4 rounded-lg hover:bg-primary-dark transition-colors duration-300"
              >
                Update
              </button>
              <button
                onClick={handleDelete}
                className="bg-red-600 m-4 text-white py-2 px-4 rounded-lg hover:bg-red-700 transition-colors duration-300"
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminJobProfile;
