import {Routes, Route, Navigate} from 'react-router-dom'
import './App.css'
import HomeScreen from './screen/HomeScreen'
import { useAuthStore } from './store/useAuthStore'

function App() {
  const {isAuthuser,login}=useAuthStore();
  return (
    <>
    <Routes>
      <Route path='/' element={isAuthuser?<HomeScreen/>:<Navigate to="/signin"/>}/>
    </Routes>
    </>
  )
}

export default App
