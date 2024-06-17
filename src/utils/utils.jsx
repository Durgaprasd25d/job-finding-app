// utils.js
import axios from "axios";

const axiosInstance = axios.create({
  baseURL: "http://localhost:5000/", // Replace with your API base URL
  headers: {
    "Content-Type": "application/json",
    // Add any other common headers here
  },
});

// Universal function for making API requests
const apiRequest = async (method, url, data = null, headers = {}) => {
  try {
    const response = await axiosInstance({
      method: method,
      url: url,
      data: data,
      headers: { ...axiosInstance.defaults.headers, ...headers }, // Merge default headers with optional headers
    });
    return response.data;
  } catch (error) {
    // Handle error
    console.error("API Error:", error);
    throw error; // Let the calling function handle the error
  }
};

export default apiRequest;
