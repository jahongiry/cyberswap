import React from 'react';
import './recommendGame.css';
import gamePerson from './gamePerson.png';
import { NavLink, Link } from 'react-router-dom';
import { selectTranslations } from '../../slices/languageSlice';
import { useSelector } from 'react-redux';

const RecommendGame = () => {
  const translations = useSelector(selectTranslations);
  return (
    <section className='recommendGame container'>
      <div className='recommend-container'>
        <div className='recommendGame-img'>
          <div className='game-img'>
            <img
              src={gamePerson}
              alt='Virtual reality gaming.'
              loading='lazy'
            />
          </div>
        </div>

        <div className='recommend-content'>
          <h1 className='title'>
            {translations.recommendation.title} <br />
            <span>{translations.recommendation.span} </span>
          </h1>
          <p className='subtitle'>{translations.recommendation.subtitle}</p>
          <Link to='/cards' className='cards-link'>
            <button className='btn'>
              <span>{translations.recommendation.span2} </span>
            </button>
          </Link>
        </div>
      </div>
    </section>
  );
};

export default RecommendGame;
