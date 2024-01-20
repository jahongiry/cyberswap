import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { verifyNumber } from '../../../slices/authSlice';
import './confirm.css';
import logo1 from '../../../component/header/logo1_1.png';
import { NavLink, Link } from 'react-router-dom';
import { selectTranslations } from '../../../slices/languageSlice';
import { useSelector } from 'react-redux';

const Confirm = () => {
  const translations = useSelector(selectTranslations);
  const [otp, setOtp] = useState('');
  const dispatch = useDispatch();
  const handleSubmit = (event) => {
    event.preventDefault();
    dispatch(verifyNumber(otp));
    // handle response or navigate to another page as needed
    console.log('Boldii');
  };

  return (
    <div className='login-section'>
      <div className='login-container-signup'>
        <div className='login-border'>
          <div className='line'>
            <div className='corner-item top-left'></div>
            <hr />
            <hr />
            <div className='corner-item top-right'></div>
          </div>
          <img className='logo-in' src={logo1} alt='logo' />
          <h2>{translations.confirm.confirmn}</h2>
          <form className='login-form' onSubmit={handleSubmit}>
            <div className='input-container'>
              <label htmlFor='password'>{translations.confirm.code}</label>
              <input
                type='text'
                id='otp'
                placeholder='1 2 3 4 5 6'
                value={otp}
                onChange={(e) => setOtp(e.target.value)}
              />
            </div>
            <div className='login-footer'>
              <NavLink to='/signup'>
                <div>
                  <label htmlFor='button'>{translations.confirm.signup}</label>
                  <button type='button' className='signup-button'>
                    {translations.confirm.signup}
                  </button>
                </div>
              </NavLink>
              <hr class='vertical-hr' />
              <div>
                <hr className='horizontal-hr' />
                <NavLink to='/signup'>
                  <button type='submit' className='login-button royhat'>
                    {translations.confirm.back}
                  </button>
                </NavLink>
              </div>
            </div>
            <button type='submit' className='login-button login-main-signup'>
              {translations.confirm.confirm}
            </button>
          </form>
          <div className='corner-item bottom-left'></div>
          <div className='corner-item bottom-right'></div>
        </div>
      </div>
    </div>
  );
};

export default Confirm;
