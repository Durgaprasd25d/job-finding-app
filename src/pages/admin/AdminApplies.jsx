import React, { useState, useEffect } from 'react';
import apiRequest from '../../utils/utils';
import AdminHeader from '../../components/AdminHeader';
import Pagination from '../../components/Pagination';
import Loader from '../../components/Loader';
import toast from 'react-hot-toast';
import emailjs from 'emailjs-com';

const AdminApplies = () => {
  const [jobApplies, setJobApplies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [applicationsPerPage] = useState(5); // Number of applications per page

  useEffect(() => {
    const fetchJobApplications = async () => {
      try {
        const token = localStorage.getItem('token');
        if (!token) throw new Error('No auth token found');

        const response = await apiRequest('GET', `/applications?page=${currentPage}`, null, {
          Authorization: `Bearer ${token}`,
        });

        setJobApplies(response);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching job applications:', error);
      }
    };

    fetchJobApplications();
  }, [currentPage]);

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const handleStatusChange = async (applicationId, newStatus, applicantEmail, applicantName) => {
    try {
      const token = localStorage.getItem('token');
      if (!token) throw new Error('No auth token found');

      // Make PUT request to update application status
      await apiRequest('PUT', `/applications/${applicationId}`, { status: newStatus }, {
        Authorization: `Bearer ${token}`,
      });

      // Prepare template parameters
      const templateParams = {
        to_name: applicantName,
        to_email: applicantEmail,
        message: `Your job application status has been updated to: ${newStatus}`,
      };

      // Log the template parameters
      console.log('Template Parameters:', templateParams);

      // Send email notification to the applicant
      const response = await emailjs.send('service_nxoadbw', 'template_wgg56dw', templateParams, 'r3EfCIyjD7KdrJ9R7');
      
      // Log the EmailJS response
      console.log('EmailJS response:', response);

      // Update locally to reflect the change
      const updatedApplications = jobApplies.map((apply) =>
        apply.applicationId === applicationId ? { ...apply, status: newStatus } : apply
      );
      setJobApplies(updatedApplications);
      toast.success('Role Updated and Email Sent');
    } catch (error) {
      toast.error('Unable to Update and Send Email', error);
      console.error('Error updating job application status:', error);
    }
  };

  const totalPages = Math.ceil(jobApplies.length / applicationsPerPage);
  const indexOfLastApplication = currentPage * applicationsPerPage;
  const indexOfFirstApplication = indexOfLastApplication - applicationsPerPage;
  const currentApplications = jobApplies.slice(indexOfFirstApplication, indexOfLastApplication);

  return (
    <div className="min-h-screen bg-gray-100">
      <AdminHeader />
      <div className="flex p-6 mt-20">
        <div className="flex-1 overflow-y-auto p-6">
          <h1 className="text-3xl font-bold text-gray-800 mb-6 mt-2">Job Applications</h1>
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Job Title
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Applicant Name
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Applicant Email
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Applied Date
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Status
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {loading ? (
                  <tr>
                    <td colSpan="6" className="px-6 py-4 whitespace-nowrap text-center">
                      <Loader />
                    </td>
                  </tr>
                ) : currentApplications.length === 0 ? (
                  <tr>
                    <td colSpan="6" className="px-6 py-4 whitespace-nowrap text-center text-gray-500">
                      No applications found
                    </td>
                  </tr>
                ) : (
                  currentApplications.map((apply) => (
                    <tr key={apply.applicationId}>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                        {apply.jobTitle}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {apply.applicantId.name}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {apply.applicantId.email}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {new Date(apply.createdAt).toLocaleDateString()}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        <span className={`inline-block px-2 py-1 rounded-lg ${getStatusColor(apply.status)}`}>
                          {apply.status}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        <select
                          className="px-2 py-1 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500"
                          value={apply.status}
                          onChange={(e) => handleStatusChange(apply.applicationId, e.target.value, apply.applicantId.email, apply.applicantId.name)}
                        >
                          {['applied', 'interview', 'offered', 'hired', 'rejected'].map((status) => (
                            <option key={status} value={status}>{status}</option>
                          ))}
                        </select>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
          {totalPages > 1 && (
            <div className="mt-4 flex justify-center">
              <Pagination currentPage={currentPage} totalPages={totalPages} onPageChange={handlePageChange} />
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

const getStatusColor = (status) => {
  switch (status) {
    case 'applied':
      return 'bg-blue-200 text-blue-800';
    case 'interview':
      return 'bg-yellow-200 text-yellow-800';
    case 'offered':
      return 'bg-green-200 text-green-800';
    case 'hired':
      return 'bg-purple-200 text-purple-800';
    case 'rejected':
      return 'bg-red-200 text-red-800';
    default:
      return 'bg-gray-200 text-gray-800';
  }
};

export default AdminApplies;
