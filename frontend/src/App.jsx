import { useState } from 'react'
import Home from './pages/Home'
import { BrowserRouter, Routes, Route } from 'react-router'
import './App.css'
import Header from './components/Header'


function App() {

  return (
    <BrowserRouter>
      <Header />
      <Routes>
        <Route path='/' element={<Home />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
