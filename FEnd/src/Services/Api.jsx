import axios from "axios";

// Create a customized Axios instance with base settings
const API = axios.create({
  baseURL: "http://localhost:5555", // Your backend API base URL
  withCredentials: true, // Include cookies in requests (optional, useful for sessions)
});

// ======================
// 🧾 AUTHENTICATION APIs
// ======================

// 📌 Register a new user
export const registerUser = (data) => API.post("/Auth/register", data); // Sends POST request with user registration data

// 🔐 Log in existing user
export const loginUser = (data) => API.post("/Auth/login", data); // Sends POST request with login credentials

// ==============================
// 🔐 PROTECTED ROUTE - Get User Info
// ==============================

// Get logged-in user profile using JWT token in Authorization header
export const getUserInfo = (token) =>
  API.get("/api/users/profile", {
    headers: {
      Authorization: `Bearer ${token}`, // Attach token for authentication
    },
  });
