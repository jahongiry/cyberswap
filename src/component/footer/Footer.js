import React from 'react';
import { Link } from 'react-router-dom';
import './footer.css';
import logo from './img/logo1_1.png';
import twitchImg from './img/twitch.png';
import robloxImg from './img/roblax.png';
import asusImg from './img/asus.png';
import canonImg from './img/canon.png';
import microsoftImg from './img/microsoft.png';

const Footer = () => {
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

          <p>
            To'lov tizimlar hozircha faqat Click evolution va Payme orqali
            amalga oshiriladi! Agar savdo tuganlanmasa pul qaytarib beriladi!
          </p>
        </div>

        <div className='footer-content company'>
          <h3>Cyberswap.uz MChJ</h3>

          <ul>
            <li>
              <Link>Mahsulotlar</Link>
            </li>
            <li>
              <Link>Telefonga application</Link>
            </li>
            <li>
              <Link>Biz haqimizda</Link>
            </li>
          </ul>
        </div>

        <div className='footer-content help'>
          <h3>Yordam</h3>

          <ul>
            <li>
              <Link>Biz bilan bog'lanish</Link>
            </li>
            <li>
              <Link>Bizning kontactlar</Link>
            </li>
            <li>
              <Link>Telegram kanalimiz</Link>
            </li>
          </ul>
        </div>

        <div className='footer-content resource'>
          <h3>resources</h3>

          <ul>
            <li>
              <Link>youtube videolarimiz</Link>
            </li>
            <li>
              <Link>Instagram accountimiz</Link>
            </li>
            <li>
              <Link>terms & conditions</Link>
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
            <i class='fa-brands fa-telegram'></i>
          </Link>
          <Link to='https://t.me/cyberswap_uz' className='icon facebook'>
            <i class='fa-brands fa-facebook-f'></i>
          </Link>
          <Link
            to='https://www.instagram.com/cyberswap.uz'
            className='icon instagram'
          >
            <i class='fa-brands fa-instagram'></i>
          </Link>
          <Link to='https://t.me/cyberswap_uz' className='icon github'>
            <i class='fa-brands fa-tiktok'></i>
          </Link>
        </div>
        <p>&copy; Copyright 2024, All Rights Reserved by oddiy inson</p>
      </div>
      {/* footer-copyright end */}
    </footer>
  );
};

export default Footer;
