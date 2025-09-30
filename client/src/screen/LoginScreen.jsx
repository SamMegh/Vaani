import React, { useState } from "react";
// Assuming these paths are correct for your project setup
import { useAuthStore } from "../store/useAuthStore";
import { Link } from "react-router-dom";
import Welcome from "../components/welcome.component";

const LoginScreen = () => {
  const [logindata, setlogindata] = useState({ email: "", password: "" });
  const [showWelcome, setShowWelcome] = useState(false);
  // Note: login and setAuth are assumed to be available from the store
  const { login, setAuth } = useAuthStore();

  const handleLogin = async (e) => {
    e.preventDefault();
    const success = await login(logindata);
    console.log(success);
    if (success) {
      setShowWelcome(true);
      setTimeout(() => {
        setAuth();
      }, 5000); // 5 seconds delay
    }
  };

  return (
    // Equivalent to .Login and body styles (Assumes global CSS handles the full-screen background)
    <div
      className="flex flex-col items-center justify-center min-h-screen 
                 bg-[#000000e6] font-orbitron"
    >
      {showWelcome ? (
        <Welcome />
      ) : (
        <>
          <form
            onSubmit={handleLogin}
            // Equivalent to .Login-card and media queries
            // bg-white p-5 rounded-xl shadow-card w-[90%] h-[50%] (mobile)
            // sm:w-[85%] md:w-[60%] lg:w-[25%] lg:h-[45%] (desktop/tablet)
            className="flex flex-col items-center justify-around bg-white p-5 rounded-xl shadow-card
                       w-[90%] h-[50%] sm:w-[85%] sm:h-[50%] md:w-[60%] lg:w-[25%] lg:h-[45%]"
          >
            {/* Equivalent to .Login-title */}
            <h1 className="text-center mb-5 uppercase font-alphawood tracking-widest text-2xl sm:text-3xl">
              Login
            </h1>

            <input
              // Equivalent to .Login-input and :focus
              className="w-4/5 sm:w-11/12 md:w-4/5 p-4 mb-2 rounded-[20px] border-none shadow-input font-light text-base focus:outline-none focus:shadow-input-focus"
              type="text"
              id="email"
              name="email"
              placeholder="Email"
              value={logindata.email}
              onChange={(e) =>
                setlogindata({ ...logindata, email: e.target.value })
              }
            />
            <input
              // Equivalent to .Login-input and :focus
              className="w-4/5 sm:w-11/12 md:w-4/5 p-4 mb-2 rounded-[20px] border-none shadow-input font-light text-base focus:outline-none focus:shadow-input-focus"
              type="password"
              id="password"
              name="password"
              placeholder="Password"
              value={logindata.password}
              onChange={(e) =>
                setlogindata({ ...logindata, password: e.target.value })
              }
            />
            <button
              // Equivalent to .Login-button and :hover
              className="w-1/3 sm:w-2/5 md:w-1/3 p-3 rounded-[20px] border-none cursor-pointer bg-white text-black shadow-input text-lg 
                         transition duration-300 ease-in-out hover:bg-[#ffd3d3]"
              type="submit"
            >
              Login
            </button>
            <p>
              {/* Equivalent to .highlight */}
              <Link to="/signup" className="text-red-600 font-bold cursor-pointer">
                Sign up
              </Link>{" "}
              if you have not registered yet
            </p>
          </form>

          {/* Equivalent to .google-login */}
          <div className="flex justify-center items-center rounded-full border-2 border-[#d1e3fd] shadow-google-login my-5 mx-auto">
            <img
              // Equivalent to .google-logo and :hover
              className="w-[60px] h-[60px] cursor-pointer rounded-full transition duration-500 ease-linear hover:scale-150"
              src="https://img.icons8.com/?size=100&id=110560&format=png&color=000000"
              alt="Google Logo"
            />
          </div>
        </>
      )}
    </div>
  );
};

export default LoginScreen;