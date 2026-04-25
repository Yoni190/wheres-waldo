import { useState } from 'react'
import Home from './pages/Home'
import { BrowserRouter, Routes, Route } from 'react-router'
import './App.css'
import Header from './components/Header'
import NotFound from './pages/NotFound'
import Game from './pages/Game'
import Footer from './components/Footer'
import { ToastContainer } from 'react-toastify'



function App() {

  return (
    <BrowserRouter>
      <div className="min-h-screen flex flex-col">
        <Header />

        <main className="flex-grow">
          <Routes>
            <Route path='/' element={<Home />} />
            <Route path='/game' element={<Game />} />
            <Route path='*' element={<NotFound />} />
          </Routes>
        </main>

        <Footer />
        <ToastContainer />
      </div>
    </BrowserRouter>
  )
}

export default App
