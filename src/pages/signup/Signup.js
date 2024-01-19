import React, { useState } from 'react';
import './signup.css';
import logo1 from '../../component/header/logo1_1.png';
import { NavLink, useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { signUp } from '../../slices/authSlice';

const Signup = () => {
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
          <h2>Ro'yxatdan o'ting</h2>
          <form className='login-form' onSubmit={handleSubmit}>
            <div className='input-container'>
              <label htmlFor='phone-number'>Telefon nomer</label>
              <input
                type='text'
                id='phone-number' // Make sure this ID is unique and descriptive
                placeholder='+998912345678'
                value={phoneNumber} // Control the input with phoneNumber state
                onChange={(e) => setPhoneNumber(e.target.value)} // Update state on change
              />
            </div>
            <div className='input-container'>
              <label htmlFor='password'>PAROL KIRITNG</label>
              <input
                type='password'
                id='password'
                placeholder='Parol'
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
            <div className='input-container'>
              <label htmlFor='confirm-password'>
                PAROLINGIZNI QAYTADAN KIRITNG
              </label>
              <input
                type='password'
                id='confirm-password'
                placeholder='Parol'
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
              />
              {passwordError && (
                <div className='error-message'>{passwordError}</div>
              )}
            </div>
            <div className='login-footer'>
              <div>
                <label htmlFor='button'>Kirishga o'tish</label>
                <NavLink to='/login'>
                  <button type='button' className='signup-button'>
                    Kirish
                  </button>
                </NavLink>
              </div>
              <hr class='vertical-hr' />
              <div>
                <hr className='horizontal-hr' />
                <NavLink to='/login'>
                  <button type='submit' className='login-button royhat'>
                    Ortga
                  </button>
                </NavLink>
              </div>
            </div>
            <button type='submit' className='login-button login-main-signup'>
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
