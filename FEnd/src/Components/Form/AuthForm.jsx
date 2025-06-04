import React, { useState } from "react";
import FormFields from "./FormFields";
import "./form.css";
import { motion, AnimatePresence } from "framer-motion";
import { loginUser, registerUser } from "../../Services/Api";

const AuthForm = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });

  const [mode, setMode] = useState("signup");
  const isLogin = mode === "login";

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

  // const handleSubmit = (e) => {
  //   e.preventDefault();
  //   console.log(`${isLogin ? "Logging in" : "Signing up"} with:`, formData);
  // };
  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(`${isLogin ? "Logging in" : "Signing up"} with:`, formData);

    try {
      if (isLogin) {
        const res = await loginUser(formData);
        console.log("Login successful:", res.data);
        alert("Login successful!");
        localStorage.setItem("token", res.data.token);
      } else {
        const res = await registerUser(formData);
        console.log("Registration successful:", res.data);
        alert("Registration successful! Please login.");
        setMode("login");
      }
    } catch (error) {
      const msg = error.response?.data?.message || "Something went wrong!";
      console.error("Auth Error:", msg);
      alert(msg);
    }
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
    <div className="min-h-screen w-full flex items-center justify-center bg-gradient-to-r from-[#341c57] via-[#3c8993] to-[#355c9e] p-4">
      <div
        className={`relative overflow-hidden flex ${
          isLogin ? "flex-col md:flex-row" : "flex-col md:flex-row-reverse"
        } max-w-4xl w-full bg-white/10 backdrop-blur-md rounded-2xl shadow-xl`}
      >
        {/* Image/Text Side */}
        <AnimatePresence mode="wait">
          <motion.div
            key={`image-${mode}`}
            variants={isLogin ? variantsLeft : variantsRight}
            initial="initial"
            animate="animate"
            exit="exit"
            className="relative md:static w-full md:w-1/2 p-6 sm:p-8 flex flex-col items-center justify-center text-center text-white z-10"
          >
            <img
              src="https://media.istockphoto.com/id/1281150061/vector/register-account-submit-access-login-password-username-internet-online-website-concept.jpg?s=612x612&w=0&k=20&c=9HWSuA9IaU4o-CK6fALBS5eaO1ubnsM08EOYwgbwGBo="
              alt="illustration"
              className="rounded-xl mb-4 sm:mb-6 w-full max-w-[300px] sm:max-w-[400px]"
            />
            <h2 className="text-xl sm:text-2xl font-bold">
              {isLogin ? "Welcome Back!" : "Join Us Today!"}
            </h2>
            <p className="text-sm sm:text-base opacity-80 mt-2">
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
            className="relative md:static w-full md:w-1/2 p-6 sm:p-8 z-20"
          >
            <form onSubmit={handleSubmit} className="space-y-4 text-white">
              <h2 className="text-xl sm:text-2xl font-semibold mb-4">
                {isLogin ? "Login" : "Sign Up"}
              </h2>
              <FormFields
                formData={formData}
                handleChange={handleChange}
                formFields={formFields}
              />
              <button
                type="submit"
                className="w-full bg-white/30 hover:bg-white/40 text-white font-bold py-2 px-4 rounded-xl transition"
              >
                {isLogin ? "Login" : "Sign Up"}
              </button>
              <p className="mt-0">
                {isLogin
                  ? "Don't have an account?"
                  : "Already have an account?"}{" "}
                <button
                  type="button"
                  onClick={() => setMode(mode === "login" ? "signup" : "login")}
                  className="underline ml-1"
                >
                  {isLogin ? "Sign Up" : "Login"}
                </button>
              </p>

              <div className="mt-6 text-sm text-center opacity-80">
                Or {isLogin ? "login" : "sign up"} with:
                <div className="flex flex-wrap justify-center gap-3 mt-2">
                  <button
                    type="button"
                    onClick={() => alert("Google Login")}
                    className="bg-red-500 hover:bg-red-600 px-3 py-1 rounded-md text-sm"
                  >
                    Google
                  </button>
                  <button
                    type="button"
                    onClick={() => alert("Facebook Login")}
                    className="bg-blue-600 hover:bg-blue-700 px-3 py-1 rounded-md text-sm"
                  >
                    Facebook
                  </button>
                  <button
                    type="button"
                    onClick={() => alert("LinkedIn Login")}
                    className="bg-blue-500 hover:bg-blue-600 px-3 py-1 rounded-md text-sm"
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
