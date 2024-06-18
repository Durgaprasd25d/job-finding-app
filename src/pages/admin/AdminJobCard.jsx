import React from "react";
import { Link } from "react-router-dom";

const JobCard = ({ job }) => {
  return (
    <div className="bg-white shadow-lg rounded-lg overflow-hidden transform hover:scale-103 transition-transform duration-200 w-full cursor-pointer">
      <Link to={`/admin/jobs/${job._id}`} className="block">
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
        </div>
      </Link>
    </div>
  );
};

export default JobCard;
