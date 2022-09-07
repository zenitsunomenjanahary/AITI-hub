import React from 'react';
import Header from './components/Header';
import Home from './pages/Home';
import {Routes, Route } from 'react-router-dom';
import Profile from './pages/Profile';

const App = () => {
  return (
      <>
        <Header/>
        <div className='py-4 px-8'>
          <Routes>
            <Route path="/" element={<Home/>}/>
            <Route path="/profile/:username" element={<Profile/>}/>
          </Routes>
        </div>
      </>
  )
}

export default App