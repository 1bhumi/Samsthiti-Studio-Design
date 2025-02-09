import React from 'react'
import Login from './pages/login'
import Signup from './pages/signup'
import User from './pages/user'
import { Route, Routes } from "react-router-dom";

function App() {
  
  return (
    <div>
      
      <Routes>
        <Route path="/" element={<User/>}/>
        <Route path="/signup" element={<Signup/>}/>
        <Route path="/login" element={<Login/>}/>
      </Routes>
      
    </div>
  )
}

export default App