// api/axios.js
import axios from "axios";

const axiosInstance = axios.create({
  baseURL: (import.meta.env.VITE_API_URL || "http://localhost:5000") + "/api", // <-- add /api
  withCredentials: true,
  headers: { "Content-Type": "application/json" },
});

axiosInstance.interceptors.request.use((config) => {
  const token = localStorage.getItem("accessToken"); // or "token" if you store it differently
  if (token) config.headers.Authorization = `Bearer ${token}`;
  return config;
});

export default axiosInstance;
