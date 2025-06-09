import "./App.css";
import Fetchdata from "./Components/Fetchdata";
import Nav from "./Components/NavBar/Nav";
import { Route, Routes, Navigate } from "react-router-dom";
import { lazy, Suspense } from "react";
import Auth from "./Pages/Auth";
import { useAuth } from "./context/AuthContext";
// import { ToastContainer } from "react-toastify";
// import "react-toastify/dist/ReactToastify.css";
import { RowProvider } from "./context/RowContext";

// Lazy loaded pages
const Home = lazy(() => import("./Pages/Home"));
const About = lazy(() => import("./Pages/About"));
const Contact = lazy(() => import("./Pages/Contact"));
const Profile = lazy(() => import("./Pages/Profile"));

function App() {
  const { loggedIn } = useAuth();

  return (
    <>
      {/* <ToastContainer position="top-center" /> */}
      <Nav />
      <Fetchdata />

      <Suspense fallback={<div className="text-center p-4">Loading...</div>}>
        <RowProvider>
          <Routes>
            {/* Public Routes */}
            <Route
              path="/auth"
              element={loggedIn ? <Navigate to="/profile" replace /> : <Auth />}
            />
            <Route path="/contact" element={<Contact />} />

            {/* Protected Routes */}
            <Route
              path="/"
              element={loggedIn ? <Home /> : <Navigate to="/auth" replace />}
            />
            <Route
              path="/about"
              element={loggedIn ? <About /> : <Navigate to="/auth" replace />}
            />
            <Route
              path="/profile"
              element={loggedIn ? <Profile /> : <Navigate to="/auth" replace />}
            />

            {/* Fallback */}
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </RowProvider>
      </Suspense>
    </>
  );
}

export default App;
