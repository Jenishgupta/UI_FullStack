import { Navigate, Route, Routes } from 'react-router-dom'
import './App.css'
import Login from './pages/Login'
import Home from './pages/Home'

function App() {
  return (
    <Routes>
      <Route path="/" element={<Navigate to="/auth/login" replace />} />
      <Route path="/auth/login" element={<Login />} />
      <Route path="/home" element={<Home />} />
      <Route path="*" element={<Navigate to="/auth/login" replace />} />
    </Routes>
  )
}

export default App
