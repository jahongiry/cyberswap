import React, { useEffect } from 'react';
import './mainSection.css';
import homeImg from '../../img/mainSection/logo1_1.png';
import { NavLink, Link } from 'react-router-dom';
import { selectTranslations } from '../../slices/languageSlice';
import { useSelector } from 'react-redux';

const MainSection = () => {
  const translations = useSelector(selectTranslations);

  return (
    <section className='mainSection container'>
      <div className='home-container'>
        <div className='home-container__info'>
          <h1 className='title'>
            {translations.main.title} <br />
            <span>"{translations.main.span}"</span>
            <br />
            {translations.main.garant}
          </h1>
          <p className='subtitle'>{translations.main.subtitle}</p>

          <div className='home-btns'>
            <Link to='/pubgucoffer' className='offer-link'>
              <button className='btn main-btn'>
                <span>{translations.main.ucsell}</span>
              </button>
            </Link>
            <Link to='/pubgaccountoffer' className='offer-link'>
              <button className='btn main-btn'>
                <span>{translations.main.pubgsell}</span>
              </button>
            </Link>
            <Link to='/cards' className='cards-link'>
              <button className='btn main-btn'>
                <span>{translations.main.offerbuy}</span>
              </button>
            </Link>
          </div>
          <div className='statistics'>
            <div className='content'>
              <h3>{translations.main.numberaccounts}</h3>
              <p>{translations.main.pubgaccounts}</p>
            </div>
            <div className='content project'>
              <h3>{translations.main.numberaccounts}</h3>
              <p>{translations.main.pubgsellers}</p>
            </div>
            <div className='content'>
              <h3>{translations.main.soldaccountsnumber}</h3>
              <p>{translations.main.soldaccounts}</p>
            </div>
          </div>
        </div>

        <div className='home-container__img'>
          <div className='home-img'>
            <img src={homeImg} alt='Game' />
          </div>
        </div>
      </div>

      <div className='statistics'>
        <div className='content'>
          <h3>{translations.main.numberaccounts}</h3>
          <p>{translations.main.pubgaccounts}</p>
        </div>
        <div className='content project'>
          <h3>{translations.main.numberaccounts}</h3>
          <p>{translations.main.pubgsellers}</p>
        </div>
        <div className='content'>
          <h3>{translations.main.soldaccountsnumber}</h3>
          <p>{translations.main.soldaccounts}</p>
        </div>
      </div>
    </section>
  );
};

export default MainSection;
