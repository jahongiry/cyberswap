import React, { useState } from 'react';
import './signup.css';
import logo1 from '../../component/header/logo1_1.png';
import { NavLink, useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { signUp } from '../../slices/authSlice';
import { selectTranslations } from '../../slices/languageSlice';
import { useSelector } from 'react-redux';

const Signup = () => {
  const translations = useSelector(selectTranslations);
  const [phoneNumber, setPhoneNumber] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleSubmit = (event) => {
    event.preventDefault();
    if (password !== confirmPassword) {
      setPasswordError('Parol togri kemadi');
      console.log(passwordError);
      return;
    }

    setPasswordError('');
    dispatch(signUp({ number: phoneNumber, password }));

    navigate('/confirm');
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
          <h2>{translations.signup.title}</h2>
          <form className='login-form' onSubmit={handleSubmit}>
            <div className='input-container'>
              <label htmlFor='phone-number'>{translations.signup.phone}</label>
              <input
                type='text'
                id='phone-number' // Make sure this ID is unique and descriptive
                placeholder='+998912345678'
                value={phoneNumber} // Control the input with phoneNumber state
                onChange={(e) => setPhoneNumber(e.target.value)} // Update state on change
              />
            </div>
            <div className='input-container'>
              <label htmlFor='password'>{translations.signup.password}</label>
              <input
                type='password'
                id='password'
                placeholder={translations.signup.passwordplaceholder}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
            <div className='input-container'>
              <label htmlFor='confirm-password'>
                {translations.signup.repassword}
              </label>
              <input
                type='password'
                id='confirm-password'
                placeholder={translations.signup.passwordplaceholder}
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
              />
              {passwordError && (
                <div className='error-message'>{passwordError}</div>
              )}
            </div>
            <div className='login-footer'>
              <div>
                <label htmlFor='button'>
                  {translations.signup.backtoenter}
                </label>
                <NavLink to='/login'>
                  <button type='button' className='signup-button'>
                    {translations.signup.enter}
                  </button>
                </NavLink>
              </div>
              <hr class='vertical-hr' />
              <div>
                <hr className='horizontal-hr' />
                <NavLink to='/login'>
                  <button type='submit' className='login-button royhat'>
                    {translations.signup.back}
                  </button>
                </NavLink>
              </div>
            </div>
            <button type='submit' className='login-button login-main-signup'>
              {translations.signup.signup}
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
