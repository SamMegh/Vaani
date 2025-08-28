import React, { useState } from "react";
import { useAuthStore } from "../store/useAuthStore";
import { Link } from "react-router-dom";
import Welcome from "../components/welcome.component";

const LoginScreen = () => {
  const [logindata, setlogindata] = useState({ email: "", password: "" });
  const [showWelcome, setShowWelcome] = useState(false);
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
    <div className="Login">
      {showWelcome ? (
        <Welcome />
      ) : (
        <>
          <form className="Login-card" onSubmit={handleLogin}>
            <h1 className="Login-title">Login</h1>

            <input
              className="Login-input"
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
              className="Login-input"
              type="password"
              id="password"
              name="password"
              placeholder="Password"
              value={logindata.password}
              onChange={(e) =>
                setlogindata({ ...logindata, password: e.target.value })
              }
            />
            <button className="Login-button" type="submit">
              Login
            </button>
            <p>
              <Link to="/signup" className="highlight">
                Sign up
              </Link>{" "}
              if you have not registered yet
            </p>
          </form>

          <div className="google-login">
            <img
              className="google-logo"
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
