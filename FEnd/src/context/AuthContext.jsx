import { createContext, useContext, useState, useEffect } from "react";
import { getUserInfo, loginUser, registerUser } from "../Services/Api";
import { useNavigate, useLocation } from "react-router-dom";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [token, setToken] = useState(localStorage.getItem("token") || null);
  const [userInfo, setUserInfo] = useState(null); // user data
  const [loggedIn, setLoggedIn] = useState(!!token);
  const navigate = useNavigate();
  const location = useLocation();

  // useEffect hook that runs whenever the `token` or `location.pathname` changes
  useEffect(() => {
    // If no token is present, reset user state and exit early
    if (!token) {
      setUserInfo(null); // Clear any existing user info
      setLoggedIn(false); // Mark user as not logged in
      return; // Exit the effect
    }

    // Async function to fetch user details using the token
    const fetchUser = async () => {
      try {
        // Call the API to get user info based on the token
        const res = await getUserInfo(token);
        setUserInfo(res.data); // Store user info in state
        setLoggedIn(true); // Mark user as logged in
      } catch (err) {
        // Handle any error that occurs during fetch (e.g., token expired or invalid)
        console.error(
          "Error fetching user info:",
          err.response?.data || err.message
        );

        // Reset user state and clean up invalid token
        setUserInfo(null);
        setLoggedIn(false);
        setToken(null); // Clear token from state
        localStorage.removeItem("token"); // Remove token from local storage
      }
    };

    // Call the fetchUser function
    fetchUser();
  }, [token, location.pathname]); // Re-run effect when token or route changes

  // Global login/signup handler
  const handleAuthSubmit = async (formData, mode, setMode, resetForm) => {
    const isLogin = mode === "login";

    try {
      if (isLogin) {
        const res = await loginUser(formData);
        const newToken = res.data.token;
        setToken(newToken);
        localStorage.setItem("token", newToken);
        setUserInfo(res.data.user || null); // if backend sends user data along with token

        setLoggedIn(true);
        alert("Login successful!");
        navigate("/");
      } else {
        const res = await registerUser(formData);
        alert("Registration successful! Please login.");
        setMode("login");
        resetForm();
        navigate("/auth");
      }
    } catch (error) {
      const msg = error.response?.data?.message || "Something went wrong!";
      if (msg === "User already exists") setMode("login");
      else if (msg === "No user Found") setMode("signup");

      console.error("Auth Error:", msg);
      alert(msg);
    }
  };

  const logout = () => {
    setToken(null);
    localStorage.removeItem("token");
    setUserInfo(null);
    setLoggedIn(false);
    navigate("/auth");
  };

  return (
    <AuthContext.Provider
      value={{
        token, // token state
        userInfo,
        loggedIn,
        setUserInfo,
        setLoggedIn,
        handleAuthSubmit,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
