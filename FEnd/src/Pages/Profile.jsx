import React from "react";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";

const Profile = () => {
  const { loggedIn, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/auth"); // Optional: Redirect to login page
  };

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold">Welcome to your Profile</h1>

      {/* Logout Button */}
      {loggedIn && (
        <button
          onClick={handleLogout}
          style={{
            width: "30%",
            position: "fixed",
            bottom: "20px",
            left: "20px",
            padding: "10px 15px",
            backgroundColor: "#f44336",
            color: "white",
            border: "none",
            borderRadius: "5px",
            cursor: "pointer",
            zIndex: 1,
          }}
        >
          Logout
        </button>
      )}
    </div>
  );
};

export default Profile;
