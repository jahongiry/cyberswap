import React from 'react';
import { Link } from 'react-router-dom';
import './footer.css';
import logo from './img/logo1_1.png';
import twitchImg from './img/twitch.png';
import robloxImg from './img/roblax.png';
import asusImg from './img/asus.png';
import canonImg from './img/canon.png';
import microsoftImg from './img/microsoft.png';
import { useSelector } from 'react-redux';
import { selectTranslations } from '../../slices/languageSlice';

const Footer = () => {
  const translations = useSelector(selectTranslations);
  return (
    <footer className='container footer'>
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
              <Link>{translations.footer.link1}</Link>
            </li>
            <li>
              <Link>{translations.footer.link2}</Link>
            </li>
            <li>
              <Link>{translations.footer.link3}</Link>
            </li>
          </ul>
        </div>

        <div className='footer-content help'>
          <h3>{translations.footer.help}</h3>

          <ul>
            <li>
              <Link>{translations.footer.link4}</Link>
            </li>
            <li>
              <Link>{translations.footer.link5}</Link>
            </li>
            <li>
              <Link>{translations.footer.link6}</Link>
            </li>
          </ul>
        </div>

        <div className='footer-content resource'>
          <h3>{translations.footer.socialmedia}</h3>

          <ul>
            <li>
              <Link>{translations.footer.link7}</Link>
            </li>
            <li>
              <Link>{translations.footer.link8}</Link>
            </li>
            <li>
              <Link>{translations.footer.link9}</Link>
            </li>
          </ul>
        </div>
      </div>
      {/* footer-container start */}

      {/* footer-partner start */}
      <div className='footer-partner'>
        <div className='img'>
          <img src={twitchImg} alt='twitch' />
        </div>
        <div className='img'>
          <img src={robloxImg} alt='roblox' />
        </div>
        <div className='img'>
          <img src={asusImg} alt='asus' />
        </div>
        <div className='img'>
          <img src={canonImg} alt='canon' />
        </div>
        <div className='img'>
          <img src={microsoftImg} alt='microsoft' />
        </div>
      </div>
      {/* footer-partner start */}

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
