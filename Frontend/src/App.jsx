import React from 'react'
import { useNavigate, Route, Router, Routes, Navigate } from 'react-router-dom'
import Signup from './Components/Signup'
import RefreshHandler from './Components/RefreshHandler'
import { useState } from 'react'
import Dashboard from './Components/Dashboard'
import Login from './Components/Login'
import { Profile } from './Components/Profile'
import ReportItem from './Components/ReportItem'
const App = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [loading, setLoading] = useState(true)

  const PrivateRoute = ({ element, isAuthenticated, loading }) => {
    if (loading) return <div>Loading...</div>; // wait for auth check
    return isAuthenticated ? element : <Navigate to="/signup" replace />;
  };

  const PublicRoute = ({ element }) => {
    const user = localStorage.getItem('user');
    return user ? <Navigate to={'/dashboard'} /> : element
  }

  return (
    <div>
      <Routes>
         <Route path='/' element={<PublicRoute element={<Login />} />} />
        <Route path='/login' element={<PublicRoute element={<Login />} />} />
        <Route path='/signup' element={<PublicRoute element={<Signup />} />} />
        <Route path='/dashboard' element={<RefreshHandler element={<Dashboard />} isAuthenticated={isAuthenticated} />} />
        <Route path='/profile' element={<RefreshHandler element={<Profile />} isAuthenticated={isAuthenticated} />} />
        <Route path='/reportItem' element={<RefreshHandler element={<ReportItem />} isAuthenticated={isAuthenticated} />} />
        {/* <Route path='*' element={} /> */}
      </Routes>
    </div>
  )
}

export default App
