import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import "./App.css";
import HomeScreen from "./screen/HomeScreen";
import { useAuthStore } from "./store/useAuthStore";
import LoginScreen from "./screen/LoginScreen";

function App() {
  const { isAuthuser } = useAuthStore();
  return (
    <>
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
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
