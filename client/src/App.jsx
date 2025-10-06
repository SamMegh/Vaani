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

gsap.registerPlugin(ScrollSmoother, ScrollTrigger);

function App() {
const{isAuthuser}=useAuthStore();

  useEffect(() => {
    const smoother = ScrollSmoother.create({
      wrapper: "#smooth-wrapper",
      content: "#smooth-content",
      smooth: 3,
      effects: true,
      });

    return () => smoother.kill();
  }, []);

  return (
    <div id="smooth-wrapper" className="overflow-x-hidden">

          <div id="smooth-content">
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
        </div>
    </div>
  );
}

export default App;
