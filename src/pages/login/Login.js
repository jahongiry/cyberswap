import './login.css';
import logo1 from '../../component/header/logo1_1.png';
import { NavLink, Link } from 'react-router-dom';
import React, { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { logIn } from '../../slices/authSlice';
import axios from 'axios';

const Login = () => {
  const [credentials, setCredentials] = useState({
    login: '',
    password: '',
  });

  const handleInputChange = (event) => {
    const { id, value } = event.target;
    setCredentials({
      ...credentials,
      [id]: value,
    });
  };

  const dispatch = useDispatch();

  const handleSubmit = (event) => {
    event.preventDefault();
    dispatch(logIn(credentials));
  };

  return (
    <div className='login-section'>
      <div className='login-container'>
        <div className='login-border'>
          <div className='line'>
            <div className='corner-item top-left'></div>
            <hr />
            <hr />
            <div className='corner-item top-right'></div>
          </div>
          <img className='logo-in' src={logo1} alt='logo' />
          <h2>Hush kelibsiz</h2>
          <form className='login-form' onSubmit={handleSubmit}>
            <div className='input-container'>
              <label htmlFor='login'>Telefon nomer</label>
              <input
                type='text'
                id='login'
                placeholder='+998912345678'
                value={credentials.login}
                onChange={handleInputChange}
              />
            </div>
            <div className='input-container'>
              <label htmlFor='password'>Parolingiz</label>
              <input
                type='password'
                id='password'
                placeholder='Password'
                value={credentials.password}
                onChange={handleInputChange}
              />
            </div>
            <div className='login-footer'>
              <div>
                <label htmlFor='button'>Parol unitdingizmi</label>
                <button type='button' className='signup-button'>
                  Parolni tiklash
                </button>
              </div>
              <hr class='vertical-hr' />
              <div>
                <hr className='horizontal-hr' />
                <NavLink to='/signup'>
                  <button type='submit' className='login-button royhat-login'>
                    Royhatdan o'tish
                  </button>
                </NavLink>
              </div>
            </div>
            <button type='submit' className='login-main'>
              Kirish
            </button>
            <div className='back-home'>
              <hr />
              <NavLink activeclassname='forgot-password' to='/'>
                ASOSIYGA QAYTISH
              </NavLink>
              <hr />
            </div>
            <hr className='bottom-line' />
          </form>
          <div className='corner-item bottom-left'></div>
          <div className='corner-item bottom-right'></div>
        </div>
      </div>
    </div>
  );
};

export default Login;
