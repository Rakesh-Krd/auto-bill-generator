import axios from "axios";

const API = axios.create({
  baseURL: "http://localhost:5000/api", // Update if hosted elsewhere
});

export const saveBillToHistory = async (bill) => {
  return await API.post("/bill/create", bill); // Make sure token is set in headers
};
API.interceptors.request.use((req) => {
  const token = localStorage.getItem("token");
  if (token) {
    req.headers.Authorization = `Bearer ${token}`;
  }
  return req;
});

export default API;
