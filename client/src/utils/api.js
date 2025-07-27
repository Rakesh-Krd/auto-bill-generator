import axios from "axios";

// Dynamically choose baseURL based on environment
const API = axios.create({
  baseURL: import.meta.env.VITE_API_URL || "http://localhost:5000/api",
});

// Set Authorization header if token exists
API.interceptors.request.use((req) => {
  const token = localStorage.getItem("token");
  if (token) {
    req.headers.Authorization = `Bearer ${token}`;
  }
  return req;
});

// Exported function to save a bill
export const saveBillToHistory = async (bill) => {
  return await API.post("/bill/create", bill);
};

export default API;
