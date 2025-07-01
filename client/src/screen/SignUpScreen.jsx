import {  useState } from "react";
import { useAuthStore } from "../store/useAuthStore";
import { Link } from "react-router-dom";
const SignUpScreen = () => {
  const [signupData, setsignupData] = useState({
    email: "",
    name: "",
    password: "",
  });
const {signup}=useAuthStore();

  const handleSignUp = async (e) => {
    e.preventDefault(); 
    try {
      await signup(signupData);
    } catch (error) {
      console.log(error);
    }
    
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
          type="text"
          id="name"
          name="name"
          placeholder="Name"
          value={signupData.name}
          onChange={(e)=>setsignupData({...signupData,name:e.target.value})}
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
  <Link to="/login" className="highlight">Login in </Link> iif you have already
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
