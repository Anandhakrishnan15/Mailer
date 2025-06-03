import "./App.css";
import Fetchdata from "./Components/fetchdata";
import Nav from "./Components/NavBar/Nav";
import { Route, Routes } from "react-router-dom";
import { lazy, Suspense } from "react";
import Auth from "./Pages/Auth";

// Lazy load components
const Home = lazy(() => import("./Pages/Home"));
const About = lazy(() => import("./Pages/About"));
const Contact = lazy(() => import("./Pages/Contact"));

function App() {
  return (
    <>
      <Nav />
      <Fetchdata />
      <Suspense fallback={<div className="text-center p-4">Loading...</div>}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/auth" element={<Auth />} />

          {/* Other routes can be lazy loaded similarly */}
        </Routes>
      </Suspense>
    </>
  );
}

export default App;
