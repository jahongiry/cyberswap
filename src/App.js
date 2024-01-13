import React from 'react';
import { Routes, Route } from 'react-router-dom';
import './App.css';
import Header from './component/header/Header';
import Footer from './component/footer/Footer';
import Home from './pages/home/Home';
import About from './pages/about/About';
import Contact from './pages/contact/Contact';
import Login from './pages/login/Login';
import Signup from './pages/signup/Signup';
import Cards from './pages/cards/Cards';
import Offer from './pages/offer/Offer';
import Payment from './pages/payment/Payment';

function App() {
  return (
    <div className='app'>
      <Header />
      <Routes>
        <Route path='/' exact element={<Home />} />
        <Route path='/about' element={<About />} />
        <Route path='/contact' element={<Contact />} />
        <Route path='/login' exact element={<Login />} />
        <Route path='/signup' exact element={<Signup />} />
        <Route path='/cards' exact element={<Cards />} />
        <Route path='/offer' element={<Offer />} />
        <Route path='/payment' exact element={<Payment />} />
      </Routes>

      <Footer />
    </div>
  );
}

export default App;
