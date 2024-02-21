import React from 'react';
import './favouriteGames.css';
import { NavLink, Link } from 'react-router-dom';
import Slider from './Slider';
import { useSelector } from 'react-redux';
import { selectTranslations } from '../../slices/languageSlice';

const FavouriteGames = () => {
  const translations = useSelector(selectTranslations);
  return (
    <section className='favouriteGames'>
      <h1 className='title'>
        {translations.favourite.title} <br />
        <span>{translations.favourite.span1}</span>{' '}
        {translations.favourite.span2}
      </h1>
      <p className='subtitle'>
        {translations.favourite.subtitle1} <br />
        {translations.favourite.subtitle2}
      </p>

      <div className='favouriteGames-container'>
        <Slider />
      </div>
      <div className='favouriteGames-btns'>
        <Link to='/pubgucoffer' className='cards-link'>
          <button className='btn'>
            <span>{translations.main.ucsell}</span>
          </button>
        </Link>
        <Link to='/pubgaccountoffer' className='cards-link'>
          <button className='btn'>
            <span>{translations.main.pubgsell}</span>
          </button>
        </Link>
      </div>
    </section>
  );
};

export default FavouriteGames;
