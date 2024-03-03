import React, { useState, useEffect } from 'react';
import { NavLink, Link } from 'react-router-dom';
import './header.css';
import logo from '../../img/mainSection/logo1_1.webp';
import { useSelector } from 'react-redux';
import { selectCurrentUser } from '../../slices/authSlice';
import LanguageSwitcher from './languageSwitcher';
import { selectTranslations } from '../../slices/languageSlice';
import home_icon from '../../img/icons/home.svg';
import offer_icon from '../../img/icons/offer_icon.svg';
import contact_icon from '../../img/icons/contact_icon.svg';
import chat_icon from '../../img/icons/chat_icon.svg';
import enter_icon from '../../img/icons/enter_icon.svg';
import hamburger_icon from '../../img/icons/hamburger_icon.svg';
import x_icon from '../../img/icons/x_icon.svg';

const Header = () => {
  const translations = useSelector(selectTranslations);
  const [navbar, setNavbar] = useState(false);
  const user = useSelector(selectCurrentUser);
  const navBtn = () => setNavbar(!navbar);

  const token = useSelector((state) => state.auth.token);

  useEffect(() => {
    window.addEventListener('scroll', () => {
      if (window.scrollY > 0) {
        setNavbar(false);
      }
    });
  }, []);

  return (
    <header
      className='container header'
      onClick={() => {
        navbar ? setNavbar(false) : console.log();
      }}
    >
      <Link to='/'>
        <div className='logo'>
          <img src={logo} alt='Cyberswap' />
        </div>
        <span>CyberSwap</span>
      </Link>

      <nav className={navbar ? 'mobile' : ''} onClick={navBtn}>
        <ul>
          <li onClick={navBtn}>
            <NavLink activeclassname='active' to='/'>
              <img src={home_icon} alt='Home' className='home-icon' />
              {translations.header.main}
            </NavLink>
          </li>
          <li onClick={navBtn}>
            <NavLink to='/cards'>
              <img src={offer_icon} alt='Home' className='home-icon' />
              {translations.header.offers}
            </NavLink>
          </li>
          <li onClick={navBtn}>
            <NavLink to='/contact'>
              <img src={contact_icon} alt='Home' className='home-icon' />
              {translations.header.contact}
            </NavLink>
          </li>
          {/* <li onClick={navBtn}>
            <NavLink to='/loginadmin'>
              <i className='fa-solid fa-hammer'></i>
              {translations.header.admin}
            </NavLink>
          </li> */}
          {user ? (
            <li>
              <Link to='/chats' className='sign-in'>
                <img src={chat_icon} alt='Home' className='home-icon-chat' />
                {translations.header.chat}
              </Link>
            </li>
          ) : null}
        </ul>
      </nav>

      <div className='header-btns'>
        <LanguageSwitcher />
        {user ? (
          <Link to='/profile' className='sign-in'>
            <img src={user.image} className='halmet'></img>
          </Link>
        ) : (
          <Link to='/login' className='sign-in'>
            <span>{translations.header.enter}</span>
            <img src={enter_icon} alt='Home' className='enter-icon' />
          </Link>
        )}
        <Link className='nav-btn' onClick={navBtn}>
          <img
            className='hamburger_icons'
            src={navbar ? x_icon : hamburger_icon}
            alt='Menu'
          />
        </Link>
      </div>
    </header>
  );
};

export default Header;
