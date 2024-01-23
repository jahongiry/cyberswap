import './loginAdmin.css';
import logo1 from '../../component/header/logo1_1.png';
import { NavLink } from 'react-router-dom';
import React from 'react';
import { useDispatch } from 'react-redux';
import { selectTranslations } from '../../slices/languageSlice';
import { useSelector } from 'react-redux';

const Login = () => {
  const translations = useSelector(selectTranslations);
  const dispatch = useDispatch();

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
          <form className='login-form'>
            <div className='input-container'>
              <label htmlFor='login'>{translations.login.phone}</label>
              <input type='text' id='login' placeholder='+998912345678' />
            </div>
            <div className='input-container'>
              <label htmlFor='password'>{translations.login.password}</label>
              <input type='password' id='password' placeholder='Password' />
            </div>
            <div className='login-footer'></div>
            <button type='submit' className='login-main'>
              {translations.login.enter}
            </button>
            <div className='back-home'>
              <hr />
              <NavLink activeclassname='forgot-password' to='/'>
                {translations.login.main}
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
