import React, { useEffect } from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import { useSelector } from 'react-redux';
import './App.css';
import Header from './component/header/Header';
import Footer from './component/footer/Footer';
import Home from './pages/home/Home';
import Advertisement from './pages/advertisement/Advertisement';
import Contact from './pages/contact/Contact';
import Login from './pages/login/Login';
import Signup from './pages/signup/Signup';
import Cards from './pages/cards/Cards';
import Offer from './pages/offer/Offer';
import Chat from './pages/chat/Chat';
import Payment from './pages/payment/Payment';
import Profile from './pages/profile/Profile';
import { useDispatch } from 'react-redux';
import { checkLogIn } from './slices/authSlice';
import Confirm from './pages/signup/confirm/Confirm';
// import Loader from "./component/loader/Loader1";
import Loader from './component/loader/Loader2';
import LoginAdmin from './pages/admin/LoginAdmin';
import Admin from './pages/admin/Admin';
import ProtectedRoute from './protectedRoutes/protectedRoute';

function App() {
  const dispatch = useDispatch();
  const { pathname } = useLocation();
  const token = useSelector((state) => state.auth.token);

  dispatch(checkLogIn());
  useEffect(() => {
    if (token) {
      dispatch(checkLogIn());
    }
  }, [dispatch, token]);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  const isAdminRoute = () => {
    return pathname.startsWith('/admin');
  };

  return (
    <div className='app'>
      {!isAdminRoute() && <Header />}
      <Routes>
        <Route path='/' exact element={<Home />} />
        <Route path='/advertisement' element={<Advertisement />} />
        <Route path='/contact' element={<Contact />} />
        <Route path='/login' exact element={<Login />} />
        <Route path='/signup' exact element={<Signup />} />
        <Route path='/confirm' exact element={<Confirm />} />
        <Route path='/cards' exact element={<Cards />} />
        <Route
          path='/offer'
          exact
          element={
            <ProtectedRoute>
              <Offer />
            </ProtectedRoute>
          }
        />
        <Route path='/payment' exact element={<Payment />} />
        <Route path='/profile' exact element={<Profile />} />
        <Route path='/chat' exact element={<Chat />} />
        <Route path='/loader' element={<Loader />} />
        <Route path='/loginadmin' element={<LoginAdmin />} />
        <Route path='/admin' element={<Admin />} />
      </Routes>
      {!isAdminRoute() && <Footer />}
    </div>
  );
}

export default App;
