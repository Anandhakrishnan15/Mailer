import React, { useState } from "react";
import FormFields from "./FormFields";
import "./form.css";
import { motion, AnimatePresence } from "framer-motion";
import { useAuth } from "../../context/AuthContext";

const AuthForm = () => {
  const { handleAuthSubmit } = useAuth();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });

  const [mode, setMode] = useState("login");
  const isLogin = mode === "login";
  // const navigate = useNavigate();

  const formFields = [
    !isLogin && {
      label: "Full Name",
      name: "name",
      type: "text",
      placeholder: "Your full name",
      required: true,
    },
    {
      label: "Email",
      name: "email",
      type: "email",
      placeholder: "Email address",
      required: true,
    },
    {
      label: "Password",
      name: "password",
      type: "password",
      placeholder: "Password",
      required: true,
    },
  ].filter(Boolean);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    handleAuthSubmit(formData, mode, setMode, () =>
      setFormData({ name: "", email: "", password: "" })
    );
  };

  const variantsLeft = {
    initial: { x: "-100%", opacity: 0 },
    animate: {
      x: 0,
      opacity: 1,
      transition: { type: "spring", stiffness: 70, damping: 15 },
    },
    exit: {
      x: "-100%",
      opacity: 0,
      transition: { duration: 0.3 },
    },
  };

  const variantsRight = {
    initial: { x: "100%", opacity: 0 },
    animate: {
      x: 0,
      opacity: 1,
      transition: { type: "spring", stiffness: 70, damping: 15 },
    },
    exit: {
      x: "100%",
      opacity: 0,
      transition: { duration: 0.3 },
    },
  };

  return (
    <div className="min-h-screen w-full flex items-center justify-center bg-gradient-to-r from-[#2c5499] via-[#1b3460] to-[#2258b6] p-4">
      <div
        className={`relative overflow-hidden flex ${
          isLogin
            ? "flex-col-reverse md:flex-row"
            : "flex-col-reverse md:flex-row-reverse"
        } max-w-4xl w-full bg-white/10 backdrop-blur-md rounded-2xl shadow-2xl`}
      >
        {/* Illustration Side */}
        <AnimatePresence mode="wait">
          <motion.div
            key={`image-${mode}`}
            variants={isLogin ? variantsLeft : variantsRight}
            initial="initial"
            animate="animate"
            exit="exit"
            className="relative md:static w-full md:w-1/2 p-8 flex flex-col items-center justify-center text-center text-white bg-[#518bff47]"
          >
            <img
              src="https://cdn-icons-png.flaticon.com/512/3135/3135715.png"
              alt="illustration"
              className="rounded-xl mb-4 sm:mb-6 w-full max-w-[280px]"
             
            />
            <h2 className="text-3xl font-bold mb-2">
              {isLogin ? "Welcome Back!" : "Join Us Today!"}
            </h2>
            <p className="text-base opacity-80">
              {isLogin
                ? "Please login to access your dashboard."
                : "Create an account to get started."}
            </p>
          </motion.div>
        </AnimatePresence>

        {/* Form Side */}
        <AnimatePresence mode="wait">
          <motion.div
            key={`form-${mode}`}
            variants={isLogin ? variantsRight : variantsLeft}
            initial="initial"
            animate="animate"
            exit="exit"
            className="relative md:static w-full md:w-1/2 p-8 z-20 flex flex-col justify-center bg-[#518bff47]"
          >
            <form
              onSubmit={handleSubmit}
              className="space-y-5 text-white flex flex-col justify-center"
            >
              <h2 className="text-3xl font-semibold mb-4">
                {isLogin ? "Login" : "Sign Up"}
              </h2>

              <FormFields
                formData={formData}
                handleChange={handleChange}
                formFields={formFields}
              />

              <button
                type="submit"
                className="w-full bg-gradient-to-r from-[#6a7efc] to-[#5f9fe2] hover:brightness-110 text-white font-semibold py-2 rounded-xl transition"
              >
                {isLogin ? "Login" : "Sign Up"}
              </button>

              <p className="text-center text-sm">
                {isLogin
                  ? "Don't have an account?"
                  : "Already have an account?"}
                <button
                  type="button"
                  onClick={() => setMode(isLogin ? "signup" : "login")}
                  className="underline ml-1 font-medium"
                >
                  {isLogin ? "Sign Up" : "Login"}
                </button>
              </p>

              <div className="mt-6 text-sm text-center opacity-80">
                Or {isLogin ? "login" : "sign up"} with:
                <div className="flex flex-wrap justify-center gap-3 mt-3">
                  <button
                    type="button"
                    onClick={() => alert("Google Login")}
                    className="bg-red-500 hover:bg-red-600 px-4 py-2 rounded-md text-sm font-medium"
                  >
                    Google
                  </button>
                  <button
                    type="button"
                    onClick={() => alert("Facebook Login")}
                    className="bg-blue-600 hover:bg-blue-700 px-4 py-2 rounded-md text-sm font-medium"
                  >
                    Facebook
                  </button>
                  <button
                    type="button"
                    onClick={() => alert("LinkedIn Login")}
                    className="bg-blue-500 hover:bg-blue-600 px-4 py-2 rounded-md text-sm font-medium"
                  >
                    LinkedIn
                  </button>
                </div>
              </div>
            </form>
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
};

export default AuthForm;
