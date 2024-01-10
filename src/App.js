import React from 'react';
import { Routes, Route } from 'react-router-dom';
import './App.css';
import Header from './component/header/Header';
import Footer from './component/footer/Footer';
import Home from './pages/home/Home';
import About from './pages/about/About';
import Basket from './pages/basket/Basket';
import Contact from './pages/contact/Contact';
import Login from './pages/login/Login';

function App() {
  return (
    <div className='app'>
      <Header />
      <Routes>
        <Route path='/' exact element={<Home />} />
        <Route path='/about' element={<About />} />
        <Route path='/basket' element={<Basket />} />
        <Route path='/contact' element={<Contact />} />
        <Route path='/login' exact element={<Login />} />
      </Routes>

      <Footer />
    </div>
  );
}

export default App;
