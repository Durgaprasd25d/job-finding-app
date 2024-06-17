import React, { useState, useEffect } from "react";
import API from "../../utils/utils";
import { useNavigate } from "react-router-dom";
import { toast } from "react-hot-toast";
import Loader from "../../components/Loader";
import Header from "../../components/Header";

const Profile = () => {
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const token = localStorage.getItem("token");
        const data = await API("GET", "/auth/profile", null, {
          Authorization: `Bearer ${token}`,
        });
        setProfile(data);
      } catch (error) {
        console.error("Failed to fetch profile", error);
        toast.error("Failed to fetch profile.");
      } finally {
        setLoading(false);
      }
    };

    fetchProfile();
  }, []);

  const handleUpdateProfile = () => {
    navigate("/update-profile");
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-100">
        <Loader />
      </div>
    );
  }

  return (
    <>
      <Header /> {/* Include the Header component */}
      <div className="min-h-screen bg-gray-100 flex flex-col items-center justify-center py-10">
        <div className="w-full max-w-md p-6 bg-white rounded-lg shadow-lg relative">
          <div className="absolute top-0 left-0 w-full h-40 bg-primary rounded-t-lg"></div>
          <div className="relative -top-20 flex flex-col items-center">
            <div className="flex items-center justify-center w-32 h-32 bg-white border-4 border-white rounded-full shadow-lg">
              <div className="flex items-center justify-center w-full h-full bg-primary text-white rounded-full text-4xl font-bold">
                {profile.name.charAt(0).toUpperCase()}
              </div>
            </div>
            <h2 className="mt-4 text-2xl font-bold text-gray-800">
              {profile.name.toUpperCase()}
            </h2>
          </div>
          <div className="mt-8 space-y-4">
            <div className="px-4 py-2 border-b border-gray-200">
              <span className="font-semibold">Name:</span> {profile.name}
            </div>
            <div className="px-4 py-2 border-b border-gray-200">
              <span className="font-semibold">Email:</span> {profile.email}
            </div>
            <div className="px-4 py-2 border-b border-gray-200">
              <span className="font-semibold">Role:</span> {profile.role}
            </div>
            <div className="px-4 py-2 border-b border-gray-200">
              <span className="font-semibold">Joined:</span>{" "}
              {new Date(profile.createdAt).toLocaleDateString()}
            </div>
          </div>
          <button
            onClick={handleUpdateProfile}
            className="w-full mt-6 px-4 py-3 text-sm font-medium text-white bg-primary border border-transparent rounded-md hover:bg-primary-dark focus:outline-none focus:ring-2 focus:ring-offset-2 focus:bg-primary-dark transition duration-150 ease-in-out"
          >
            Update Profile
          </button>
        </div>
      </div>
    </>
  );
};

export default Profile;
