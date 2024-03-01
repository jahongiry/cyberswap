import './loginAdmin.css';
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useDispatch, useSelector } from 'react-redux';
import { selectTranslations } from '../../slices/languageSlice';
import logo1 from '../../component/header/logo1_1.png';
import { NavLink } from 'react-router-dom';
import { MAINURL } from '../../api/axios';

const Login = () => {
  const translations = useSelector(selectTranslations);
  const navigate = useNavigate();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post(
        `${MAINURL}/admin/login`,
        `username=${username}&password=${password}`,
        {
          headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
          },
        }
      );

      if (response.data.access_token) {
        localStorage.setItem('admintoken', response.data.access_token);
        navigate('/admin');
      } else {
        console.error('Login failed: No access token received');
      }
    } catch (error) {
      console.error('Login error:', error);
    }
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
          <h2>{translations.login.welcome}</h2>
          <form className='login-form' onSubmit={handleLogin}>
            <div className='input-container'>
              <label htmlFor='login'>{translations.login.phone}</label>
              <input
                type='text'
                id='login'
                placeholder='+998912345678'
                value={username}
                onChange={(e) => setUsername(e.target.value)}
              />
            </div>
            <div className='input-container'>
              <label htmlFor='password'>{translations.login.password}</label>
              <input
                type='password'
                id='password'
                placeholder='Password'
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
            <button type='submit' className='login-main'>
              {translations.login.enter}
            </button>
            <div className='back-home'>
              <hr />
              <NavLink to='/'>{translations.login.main}</NavLink>
              <hr />
            </div>
          </form>
          <div className='corner-item bottom-left'></div>
          <div className='corner-item bottom-right'></div>
        </div>
      </div>
    </div>
  );
};

export default Login;
