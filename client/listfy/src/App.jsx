import React from 'react';
import { Route, Routes } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './containers/Home';
import { ToastContainer } from 'react-toastify';
import Login from './containers/Login';
import Profile from './containers/Profile.jsx';
function App() {
  return (
    <div className="min-h-screen bg-gray-50">
      <ToastContainer />
      <Navbar />
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/login' element={<Login />} />
        <Route path='/profile' element={<Profile />} />
      </Routes>
    </div>
  )
}

export default App
