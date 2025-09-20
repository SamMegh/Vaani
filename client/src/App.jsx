import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import "./App.css";

// Prevent scrolling and ensure all content fits
const noScrollStyle = {
  height: "100vh",
  width: "100vw",
  overflow: "hidden",
  position: "relative"
};
import HomeScreen from "./screen/HomeScreen";
import { useAuthStore } from "./store/useAuthStore";
import LoginScreen from "./screen/LoginScreen";
import SignUp from "./screen/SignUpScreen";
import { Loader } from 'lucide-react'
import { useEffect } from "react";

function App() {
  const { isAuthuser,checkauth,isCheckauth } = useAuthStore();

    useEffect(() => {
    checkauth();
    
  }, [checkauth]);
if(isCheckauth&& !isAuthuser)return(
  <div className='main-loading-icon'>
    <Loader size={30}/>
    </div>
)
  return (
    <div style={noScrollStyle}>
      <BrowserRouter>
        <Routes>
          <Route
            path="/"
            element={isAuthuser ? <HomeScreen /> : <Navigate to="/login" />}
          />
          <Route
            path="/login"
            element={!isAuthuser ? <LoginScreen /> : <Navigate to="/" />}
          />
          <Route
            path="/signup"
            element={!isAuthuser ? <SignUp /> : <Navigate to="/" />}
          />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
