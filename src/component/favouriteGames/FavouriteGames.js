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
        <Link to='/cards' className='cards-link'>
          <button className='btn'>
            <span>{translations.favourite.span3}</span>
          </button>
        </Link>
        <Link to='/offer' className='cards-link'>
          <button className='btn'>
            <span>{translations.favourite.span4}</span>
          </button>
        </Link>
      </div>
    </section>
  );
};

export default FavouriteGames;
