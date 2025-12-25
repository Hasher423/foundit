import React from 'react'
import { useNavigate, Route, Router, Routes, Navigate } from 'react-router-dom'
import Signup from './Components/Signup'
const App = () => {
  

  return (
    <div>
      <Routes>
        <Route path='/signup' element={<Signup />} />
        {/* <Route path='/dashboard' element={} />
        <Route path='*' element={} /> */}
      </Routes>
    </div>
  )
}

export default App