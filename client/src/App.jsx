import { useEffect, useState, useRef } from "react";
import "./index.css";
import gsap from "gsap";
import ScrollSmoother from "gsap/ScrollSmoother";
import ScrollTrigger from "gsap/ScrollTrigger";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import HomeScreen from "./screen/HomeScreen";
import LoginScreen from "./screen/LoginScreen";
import SignUpScreen from "./screen/SignUpScreen";
import { useAuthStore } from "./store/useAuthStore";
import LandingScreen from "./screen/landingScreen";
import OnLoder from "./components/OnLoder";
import './App.css'

gsap.registerPlugin(ScrollSmoother, ScrollTrigger);

function App() {
  const { isAuthuser, isCheckauth, checkauth } = useAuthStore();

  useEffect(() => {
    const smoother = ScrollSmoother.create({
      wrapper: "#smooth-wrapper",
      content: "#smooth-content",
      smooth: 1.5,
      effects: true,
    });

    return () => smoother.kill();
  }, []);
    useEffect(() => {
    checkauth();
    
  }, [checkauth]);
if(isCheckauth&& !isAuthuser)return(
  <div className='main-loading-icon'>
    <OnLoder size={30}/>
    </div>
)
  return (

        <BrowserRouter>
          <Routes>
            <Route
              path="/"
              element={isAuthuser ? <HomeScreen /> : <LandingScreen />}
            />
            <Route
              path="/login"
              element={!isAuthuser ? <LoginScreen /> : <Navigate to="/" />}
            />
            <Route
              path="/signup"
              element={!isAuthuser ? <SignUpScreen /> : <Navigate to="/" />}
            />
          </Routes>
        </BrowserRouter>
      
  );
}

export default App;
