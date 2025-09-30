import { useState } from "react";
// Assuming this path is correct for your project setup
import { useAuthStore } from "../store/useAuthStore";
// Assuming 'react-router-dom' is installed
import { Link } from "react-router-dom";

const SignUpScreen = () => {
  const [signupData, setsignupData] = useState({
    email: "",
    name: "",
    password: "",
  });

  // Note: I'm keeping the original variable names for integration simplicity
  const { signup } = useAuthStore();

  const handleSignUp = async (e) => {
    e.preventDefault();
    try {
      // The signup function call is kept as is
      await signup(signupData);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    // Equivalent to .Login and body styles (Assuming global CSS handles the full-screen background)
    <div
      className="flex flex-col items-center justify-center min-h-screen 
                 bg-[#000000e6] font-orbitron"
    >
      <form onSubmit={handleSignUp} 
        // Equivalent to .Login-card
        // bg-white p-5 rounded-xl shadow-card w-[90%] h-[50%] (mobile) 
        // md:w-[60%] md:h-[50%] lg:w-[25%] lg:h-[45%] (desktop/tablet)
        className="flex flex-col items-center justify-around bg-white p-5 rounded-xl shadow-card
                   w-[90%] h-[50%] sm:w-[85%] sm:h-[50%] md:w-[60%] lg:w-[25%] lg:h-[45%]"
      >
        {/* Equivalent to .Login-title */}
        <h1 className="text-center mb-5 uppercase font-alphawood tracking-widest text-2xl sm:text-3xl">
          Sign Up
        </h1>

        <input
          // Equivalent to .Login-input
          // focus:ring-2 focus:ring-[#f0c7ff] focus:ring-inset
          className="w-4/5 sm:w-11/12 md:w-4/5 p-4 mb-2 rounded-[20px] border-none shadow-input font-light text-base focus:outline-none focus:shadow-input-focus"
          type="text"
          id="email"
          name="email"
          placeholder="Email"
          value={signupData.email}
          onChange={(e) => setsignupData({ ...signupData, email: e.target.value })}
        />

        <input
          className="w-4/5 sm:w-11/12 md:w-4/5 p-4 mb-2 rounded-[20px] border-none shadow-input font-light text-base focus:outline-none focus:shadow-input-focus"
          type="text"
          id="name"
          name="name"
          placeholder="Name"
          value={signupData.name}
          onChange={(e) => setsignupData({ ...signupData, name: e.target.value })}
        />
        
        <input
          className="w-4/5 sm:w-11/12 md:w-4/5 p-4 mb-2 rounded-[20px] border-none shadow-input font-light text-base focus:outline-none focus:shadow-input-focus"
          type="password"
          id="password"
          name="password"
          placeholder="Password"
          value={signupData.password}
          onChange={(e) => setsignupData({ ...signupData, password: e.target.value })}
        />
        
        <button 
          // Equivalent to .Login-button & :hover
          className="w-1/3 sm:w-2/5 md:w-1/3 p-3 rounded-[20px] border-none cursor-pointer bg-white text-black shadow-input text-lg 
                     transition duration-300 ease-in-out hover:bg-[#ffd3d3]"
          type="submit"
        >
          Sign Up
        </button>
        {/* <h3 className="text-red-600 font-bold cursor-pointer">Something went wrong</h3> */}
        <p>
          <Link to="/login" className="text-red-600 font-bold cursor-pointer">
            Login in
          </Link>{" "}
          if you have already registered{" "}
        </p>
      </form>

      {/* Equivalent to .google-login */}
      <div className="flex justify-center items-center rounded-full border-2 border-[#d1e3fd] shadow-google-login my-5 mx-auto">
        <img
          // Equivalent to .google-logo & :hover
          className="w-[60px] h-[60px] cursor-pointer rounded-full transition duration-500 ease-linear hover:scale-150"
          src="https://img.icons8.com/?size=100&id=110560&format=png&color=000000"
          alt="Google Logo"
        ></img>
      </div>
    </div>
  );
};

export default SignUpScreen;