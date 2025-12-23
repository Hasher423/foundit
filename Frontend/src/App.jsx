import React from 'react'
import { useNavigate, Route, Router, Routes, Navigate } from 'react-router-dom'
import Login from './Components/Login'
import NotFound from './Components/NotFound'
import { GoogleOAuthProvider } from '@react-oauth/google'
import { useState } from 'react'
import RefreshHandler from './Components/RefreshHandler'
import Dashboard from './Components/Dashboard'

const App = () => {
  const [isAutheticated, setIsAutheticated] = useState(false)
  const GoogleAuthWrapper = () => {
    return (
      <GoogleOAuthProvider clientId={import.meta.env.VITE_CLIENT_ID}>
        <Login />
      </GoogleOAuthProvider>
    )
  }

  const PrivateRoute = ({ element }) => {
    return isAutheticated ? element : <Navigate to={'/login'} replace />
  }


  return (
    <div>
      {/* <RefreshHandler setIsAutheticated={setIsAutheticated} /> */}
      <Routes>
        <Route path='/login' element={<GoogleAuthWrapper />} />
        <Route path='/dashboard' element={<Dashboard />} />
        <Route path='*' element={<NotFound />} />
      </Routes>
    </div>
  )
}

export default App