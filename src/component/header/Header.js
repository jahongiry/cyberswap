import React, { useState } from 'react';
import { NavLink, Link } from 'react-router-dom';
import halmet from '../../img/halmet.png';
import './header.css';
import logo from './logo1_1.png';
import { useSelector } from 'react-redux';
import { selectCurrentUser } from '../../slices/authSlice';

const Header = () => {
  const [navbar, setNavbar] = useState(false);
  const user = useSelector(selectCurrentUser);
  console.log(user);

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
              <i className='fa-solid fa-house'></i>
              Asosiy
            </NavLink>
          </li>
          <li onClick={navBtn}>
            <NavLink to='/advertisement'>
              <i className='fa-solid fa-circle-info'></i>E'lonlar
            </NavLink>
          </li>
          <li onClick={navBtn}>
            <NavLink to='/contact'>
              <i className='fa-solid fa-comments'></i>Bog'lanish
            </NavLink>
          </li>
        </ul>
      </nav>

      <div className='header-btns'>
        {user ? (
          <Link to='/profile' className='sign-in'>
            <img src={halmet} className='halmet'></img>
          </Link>
        ) : (
          <Link to='/login' className='sign-in'>
            <span>Kirish</span>
            <i className='fa fa-sign-in' aria-hidden='true'></i>
          </Link>
        )}
        <Link className='nav-btn' onClick={navBtn}>
          <i className={navbar ? 'fa-solid fa-times' : 'fa-solid fa-bars'}></i>
        </Link>
      </div>
    </header>
  );
};

export default Header;
