import React from 'react'
import { useNavigate, Route, Router, Routes, Navigate } from 'react-router-dom'
import Signup from './Components/Signup'
import RefreshHandler from './Components/RefreshHandler'
import { useState } from 'react'
import Dashboard from './Components/Dashboard'
import Login from './Components/Login'
const App = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false)

  const PrivateRoute = ({ element, isAuthenticated }) => {
    return isAuthenticated ? element : <Navigate to="/signup" replace />;
  };
  return (
    <div>
      <RefreshHandler setIsAuthenticated={setIsAuthenticated} />
      <Routes>
        <Route path='/login' element={<Login />} /> 
        <Route path='/signup' element={<Signup />} />
        <Route path='/dashboard' element={<PrivateRoute element={<Dashboard />} isAuthenticated={isAuthenticated} />} />
        {/* <Route path='*' element={} /> */}
      </Routes>
    </div>
  )
}

export default App