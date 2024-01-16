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
            <i className="fa-solid fa-house"></i>
              Asosiy
            </NavLink>
          </li>
          <li onClick={navBtn}>
            <NavLink to='/advertisement'><i className="fa-solid fa-circle-info"></i>E'lonlar</NavLink>
          </li>
          <li onClick={navBtn}>
            <NavLink to='/contact'><i className="fa-solid fa-comments"></i>Bog'lanish</NavLink>
          </li>
        </ul>
      </nav>

      <div className='header-btns'>
        <Link to='/login' className='sign-in'>
          <span>Kirish</span>
          <i className='fa fa-sign-in' aria-hidden='true'></i>
        </Link>

        <Link className='nav-btn' onClick={navBtn}>
          <i className={navbar ? 'fa-solid fa-times' : 'fa-solid fa-bars'}></i>
        </Link>
      </div>
    </header>
  );
};

export default Header;
