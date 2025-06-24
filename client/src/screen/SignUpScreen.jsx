import React, { useState } from "react";
import { useAuthStore } from "../store/useAuthStore";

const SignUpScreen = () => {
  const [signupData, setsignupData] = useState({
    email: "",
    password: "",
  });
const {signup}=useAuthStore();

  const handleSignUp = async (e) => {
    e.preventDefault(); 
    await signup(signupData);
  };

  return (
    <div className="Login">
      <form onSubmit={handleSignUp} className="Login-card">
        <h1 className="Login-title">Sign Up</h1>

        <input
          className="Login-input"
          type="text"
          id="email"
          name="email"
          placeholder="Email"
          value={signupData.email}
          onChange={(e)=>setsignupData({...signupData,email:e.target.value})}
        />
        <input
          className="Login-input"
          type="password"
          id="password"
          name="password"
          placeholder="Password"
          value={signupData.password}
          onChange={(e)=>setsignupData({...signupData,password:e.target.value})}
        />
        <button className="Login-button" type="submit">
          Sign Up
        </button>
        {/* <h3 className="highlight">Something went wrong</h3> */}
        <p>
          <span className="highlight">Login in </span> if you have already
          registered{" "}
        </p>
      </form>

      <div className="google-login">
        <img
          className="google-logo"
          src="https://img.icons8.com/?size=100&id=110560&format=png&color=000000"
          alt="Google Logo"
        ></img>
      </div>
    </div>
  );
};

export default SignUpScreen;
