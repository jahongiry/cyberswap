import React, { useState } from 'react';
import { NavLink, Link } from 'react-router-dom';

import './header.css';

import logo from './logo1_1.png';

const Header = () => {
  const [navbar, setNavbar] = useState(false);
  const navBtn = () => setNavbar(!navbar);
  return (
    <header className='container header'>
      <Link to='/'>
        <div className='logo'>
          <img src={logo} alt='Cyberswap' />
        </div>
        <span>Cyberswap</span>
      </Link>

      <nav className={navbar ? 'mobile' : ''}>
        <ul>
          <li onClick={navBtn}>
            <NavLink activeclassname='active' to='/'>
              Asosiy
            </NavLink>
          </li>
          <li onClick={navBtn}>
            <NavLink to='/about'>Biz haqimizda</NavLink>
          </li>
          <li onClick={navBtn}>
            <NavLink to='/contact'>Bog'lanish</NavLink>
          </li>
        </ul>
      </nav>

      <div className='header-btns'>
        <Link to='/login' className='basket'>
          <span>Kirish</span>
          <i class='fa fa-sign-in' aria-hidden='true'></i>
        </Link>

        <Link className='nav-btn' onClick={navBtn}>
          <i className={navbar ? 'fa-solid fa-times' : 'fa-solid fa-bars'}></i>
        </Link>
      </div>
    </header>
  );
};

export default Header;
