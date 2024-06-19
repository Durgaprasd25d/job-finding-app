import React, { useEffect, useState } from "react";
import apiRequest from "../../utils/utils";
import ToggleSwitch from "../../components/ToggleButton";
import { toast } from "react-hot-toast";
import Loader from "../../components/Loader";
import Pagination from "../../components/Pagination"; 

const AdminUserList = () => {
  const [users, setUsers] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [usersPerPage] = useState(10);

  useEffect(() => {
    fetchUsers();
  }, [currentPage]);

  const fetchUsers = async () => {
    try {
      setIsLoading(true); // Start loading

      const token = localStorage.getItem("token");
      if (!token) throw new Error("No auth token found");

      const response = await apiRequest("GET", "/auth/users", null, {
        Authorization: `Bearer ${token}`,
      });
      setUsers(response);
    } catch (error) {
      console.error("Failed to fetch users:", error);
      toast.error("Failed to fetch users");
    } finally {
      setIsLoading(false); // Stop loading
    }
  };

  const toggleUserRole = async (userId, currentRole) => {
    try {
      setIsLoading(true); // Start loading

      const token = localStorage.getItem("token");
      if (!token) throw new Error("No auth token found");

      const newRole = currentRole === "admin" ? "user" : "admin";

      const response = await apiRequest(
        "PATCH",
        `/auth/change-role/${userId}`,
        { role: newRole },
        {
          Authorization: `Bearer ${token}`,
        }
      );

      if (response) {
        setUsers((prevUsers) =>
          prevUsers.map((user) =>
            user._id === userId ? { ...user, role: newRole } : user
          )
        );
        toast.success("Role updated successfully");
      }
    } catch (error) {
      console.error("Failed to toggle user role:", error);
      toast.error("Failed to update role");
    } finally {
      setIsLoading(false); // Stop loading
    }
  };

  const indexOfLastUser = currentPage * usersPerPage;
  const indexOfFirstUser = indexOfLastUser - usersPerPage;
  const currentUsers = users.slice(indexOfFirstUser, indexOfLastUser);

  const totalPages = Math.ceil(users.length / usersPerPage);

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <h1 className="text-3xl font-bold text-gray-800 mb-6">User List</h1>
      <div className="bg-white shadow-md rounded-lg p-6">
        {isLoading ? (
          <Loader /> // Display loader when isLoading is true
        ) : (
          <>
            <table className="min-w-full leading-normal">
              <thead>
                <tr>
                  <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-primary uppercase tracking-wider">
                    Name
                  </th>
                  <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-primary uppercase tracking-wider">
                    Email
                  </th>
                  <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-primary uppercase tracking-wider">
                    Role
                  </th>
                  <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-primary uppercase tracking-wider">
                    Joined At
                  </th>
                  <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-primary uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody>
                {currentUsers.length === 0 ? (
                  <tr>
                    <td
                      colSpan="5"
                      className="px-5 py-5 border-b border-gray-200 bg-white text-sm text-center"
                    >
                      No users found.
                    </td>
                  </tr>
                ) : (
                  currentUsers.map((user) => (
                    <tr key={user._id}>
                      <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                        <p className="text-gray-900 whitespace-no-wrap">
                          {user.name}
                        </p>
                      </td>
                      <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                        <p className="text-gray-900 whitespace-no-wrap">
                          {user.email}
                        </p>
                      </td>
                      <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                        <p className="text-gray-900 whitespace-no-wrap">
                          {user.role}
                        </p>
                      </td>
                      <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                        <p className="text-gray-900 whitespace-no-wrap">
                          {new Date(user.createdAt).toLocaleDateString()}
                        </p>
                      </td>
                      <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                        <ToggleSwitch
                          isOn={user.role === "admin"}
                          handleToggle={() =>
                            toggleUserRole(user._id, user.role)
                          }
                        />
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
            <Pagination
              currentPage={currentPage}
              totalPages={totalPages}
              onPageChange={setCurrentPage}
            />
          </>
        )}
      </div>
    </div>
  );
};

export default AdminUserList;
