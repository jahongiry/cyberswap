import './login.css';
import logo1 from '../../component/header/logo1_1.png';
import { NavLink, Link, useNavigate } from 'react-router-dom';
import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { logIn, errorState } from '../../slices/authSlice';
import { selectTranslations } from '../../slices/languageSlice';
import { useSelector } from 'react-redux';
import { toast } from 'react-toastify';

const Login = () => {
  const translations = useSelector(selectTranslations);
  const navigate = useNavigate();
  const [credentials, setCredentials] = useState({
    login: '+998',
    password: '',
  });

  const [errorMessage, setErrorMessage] = useState(false);

  const handleInputChange = (event) => {
    const { id, value } = event.target;
    setCredentials({
      ...credentials,
      [id]: value,
    });
  };

  const dispatch = useDispatch();

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      // Remove '+' sign from the phone number if it exists
      const phoneNumber = credentials.login.replace('+', '');

      const loginPayload = {
        login: phoneNumber,
        password: credentials.password,
      };

      const actionResult = await dispatch(logIn(loginPayload));
      if (logIn.rejected.match(actionResult)) {
        const errorDetail = actionResult.payload
          ? actionResult.payload.detail
          : 'Unknown error';
        setErrorMessage(errorDetail);
        const languagePreference = localStorage.getItem('languagePreference');
        toast.error(
          <p className='red-text-important'>
            {errorDetail[languagePreference]}
          </p>
        );
        return;
      }
      const userData = actionResult.payload;
      if (userData && userData.token) {
        const lastPath = localStorage.getItem('lastPath') || '/';
        navigate(lastPath);
        localStorage.removeItem('lastPath');
      }
    } catch (error) {
      toast.error(<p className='red-text-important'>{error.message}</p>);
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
          <form className='login-form' onSubmit={handleSubmit}>
            <div className='input-container phone'>
              <label htmlFor='login'>{translations.login.phone}</label>
              {/* <span className='prefix-phone'>+998</span> */}
              <input
                type='mobile'
                id='login'
                placeholder='123456789'
                value={credentials.login}
                onChange={handleInputChange}
                autoComplete='off'
              />
            </div>
            <div className='input-container'>
              <label htmlFor='password'>{translations.login.password}</label>
              <input
                type='password'
                id='password'
                placeholder='Password'
                value={credentials.password}
                onChange={handleInputChange}
              />
            </div>
            <button type='submit' className='login-main'>
              {translations.login.enter}
            </button>
            <div className='login-footer'>
              <div>
                <label htmlFor='button'>{translations.login.forget}</label>
                <button type='button' className='signup-button'>
                  {translations.login.restore}
                </button>
              </div>
              <hr className='vertical-hr' />
              <div>
                <hr className='horizontal-hr' />
                <NavLink to='/signup'>
                  <button type='submit' className='login-button royhat-login'>
                    {translations.login.signup}
                  </button>
                </NavLink>
              </div>
            </div>

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
