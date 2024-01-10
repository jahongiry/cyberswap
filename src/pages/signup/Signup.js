import React from 'react';
import './signup.css';
import logo1 from '../../component/header/logo1_1.png';
import { NavLink, Link } from 'react-router-dom';

const Signup = () => {
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
          <h2>Ro'yxatdan o'ting</h2>
          <form className='login-form'>
            <div className='input-container'>
              <label htmlFor='username'>Telefon nomer</label>
              <input type='text' id='username' placeholder='+998912345678' />
            </div>
            <div className='input-container'>
              <label htmlFor='username'>PAROL KIRITNG</label>
              <input type='text' id='username' placeholder='Parol' />
            </div>
            <div className='input-container'>
              <label htmlFor='password'>PAROLINGIZNI QAYTADAN KIRITNG</label>
              <input type='password' id='password' placeholder='Parol' />
            </div>
            <div className='login-footer'>
              <div>
                <label htmlFor='button'>SMSni tasdiqlash</label>
                <button type='button' className='signup-button'>
                  SMS keldi
                </button>
              </div>
              <hr class='vertical-hr' />
              <div>
                <hr className='horizontal-hr' />
                <NavLink to='/login'>
                  <button type='submit' className='login-button royhat'>
                    Kirish
                  </button>
                </NavLink>
              </div>
            </div>
            <input
              className='sms'
              type='text'
              id='username'
              placeholder='sms codeni kiriting'
            />
            <button type='submit' className='login-button login-main'>
              Ro'yxatdan o'tish
            </button>
          </form>
          <div className='corner-item bottom-left'></div>
          <div className='corner-item bottom-right'></div>
        </div>
      </div>
    </div>
  );
};

export default Signup;
