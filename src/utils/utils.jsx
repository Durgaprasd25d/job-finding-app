import axios from "axios";

const axiosInstance = axios.create({
  baseURL: "http://localhost:5000/",
  headers: {
    "Content-Type": "application/json",
  },
});

const apiRequest = async (method, url, data = null, headers = {}) => {
  try {
    const token = localStorage.getItem("token");

    const config = {
      method: method,
      url: url,
      headers: {
        "Content-Type": "application/json",
        Authorization: token ? `Bearer ${token}` : "",
        ...headers,
      },
      data: data,
    };

    const response = await axiosInstance(config);
    return response.data;
  } catch (error) {
    console.error("API Error:", error.response);
    throw error.response.data; // Throw the actual error response data for better error handling
  }
};

export default apiRequest;
