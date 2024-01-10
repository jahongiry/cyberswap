import React from 'react';
import './login.css';
import logo1 from '../../component/header/logo1_1.png';

const Login = () => {
  return (
    <div className='about-container'>
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
          <form className='login-form'>
            <div className='input-container'>
              <label htmlFor='username'>Telefon nomer</label>
              <input type='text' id='username' placeholder='Username' />
            </div>
            <div className='input-container'>
              <label htmlFor='password'>Parolingiz</label>
              <input type='password' id='password' placeholder='Password' />
            </div>
            <div className='login-footer'>
              <button type='button' className='signup-button'>
                Ro'yxatdan o'tish
              </button>
              <button type='submit' className='login-button'>
                Kirish
              </button>
            </div>
            <a href='#' className='forgot-password'>
              Parolingiz esizdan chiqdimi?
            </a>
          </form>
          <div className='corner-item bottom-left'></div>
          <div className='corner-item bottom-right'></div>
        </div>
      </div>
    </div>
  );
};

export default Login;
