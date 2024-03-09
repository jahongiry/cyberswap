import React from 'react';
import { Link } from 'react-router-dom';
import './footer.css';
import logo from './img/logo1_1.png';
import { useSelector } from 'react-redux';
import { selectTranslations } from '../../slices/languageSlice';

const Footer = () => {
  const translations = useSelector(selectTranslations);
  return (
    <footer className='container footer'>

      {/* footer-container start */}
      <div className='footer-container'>
        <div className='footer-content footer-logo'>
          <Link to='/'>
            <div className='logo'>
              <img src={logo} alt='Cyberswap logo' />
            </div>
            <span>Cyberswap</span>
          </Link>

          <p>{translations.footer.paragraph1}</p>
        </div>

        <div className='footer-content company'>
          <h3>Cyberswap.uz MChJ</h3>

          <ul>
            <li>
              <Link to='/pubgucoffer'>{translations.footer.link1}</Link>
            </li>
            <li>
              <Link to='/pubgaccountoffer'>{translations.footer.link2}</Link>
            </li>
            <li>
              <Link to='/cards'>{translations.footer.link3}</Link>
            </li>
          </ul>
        </div>

        <div className='footer-content help'>
          <h3>{translations.footer.help}</h3>

          <ul>
            <li>
              <Link to="/contact">{translations.footer.link4}</Link>
            </li>
            
            <li>
              <Link to='https://t.me/cyberswap_uz'>{translations.footer.link6}</Link>
            </li>
          </ul>
        </div>

      </div>
      {/* footer-container end */}

      {/* footer-copyright start */}
      <div className='footer-copyright'>
        <div className='footer-social__network'>
          <Link to='https://t.me/cyberswap_uz' className='icon twitter'>
            <i className='fa-brands fa-telegram'></i>
          </Link>
          <Link to='https://t.me/cyberswap_uz' className='icon facebook'>
            <i className='fa-brands fa-facebook-f'></i>
          </Link>
          <Link
            to='https://www.instagram.com/cyberswap.uz'
            className='icon instagram'
          >
            <i className='fa-brands fa-instagram'></i>
          </Link>
          <Link to='https://t.me/cyberswap_uz' className='icon github'>
            <i className='fa-brands fa-tiktok'></i>
          </Link>
        </div>
        <p>
          &copy; Copyright 2024, All Rights Reserved by Azimjon, Jahongir,
          Sanjar
        </p>
      </div>
      {/* footer-copyright end */}

    </footer>
  );
};

export default Footer;
