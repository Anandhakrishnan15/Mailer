import axios from "axios";

// Create a customized Axios instance with base settings
const API = axios.create({
  baseURL:
    "http://localhost:5555" || "https://t9m2z60t-5555.inc1.devtunnels.ms/", // Your backend API base URL
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

  // 🔍 Check if row ID exists (used in RowContext)
  export const checkRowId = (rowId, token) =>
    API.post(
      "/api/rows/check-id",
      { rowId },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    // ✅ Submit or update row data
export const submitRow = (rowData, token) =>
  API.post("/api/rows/rowpost", rowData, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  export const getRows = (token) =>
    API.get("/api/rows/rowget", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

