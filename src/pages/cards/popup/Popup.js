import React from 'react';
import './popup.css';
import { selectTranslations } from '../../../slices/languageSlice';
import { useSelector } from 'react-redux';

const PopUp = ({ isVisible, togglePopUp, game }) => {
  const translations = useSelector(selectTranslations);
  if (!isVisible) return null;
  return (
    <div className='pop-up-overlay'>
      <div className='pop-up'>
        <button className='close' onClick={togglePopUp}>
          <ion-icon name='close-circle-outline'></ion-icon>
        </button>
        <div className='top'>
          <img src={game.img} alt='game name' />
          <div>
            <h3>
              <span>{translations.popup.owner}:</span> {game.owner}
            </h3>
            <p>{game.description}</p>
            <ion-icon name='star'></ion-icon>
            <ion-icon name='star'></ion-icon>
            <ion-icon name='star'></ion-icon>
            <ion-icon name='star-half'></ion-icon>
            <ion-icon name='star-outline'></ion-icon>
          </div>
        </div>
        <hr className='divider' />
        <div className='account-details'>
          <h2>{translations.popup.about}</h2>
          <div className='each-row'>
            <p>
              <ion-icon name='id-card-outline'></ion-icon>Id:
            </p>
            <p className='facts'>{game.id}</p>
          </div>
          <hr className='divider2' />
          <div className='each-row'>
            <p>
              <ion-icon name='analytics-outline'></ion-icon>
              {translations.popup.level}:
            </p>
            <p className='facts'>{game.level}</p>
          </div>
          <hr className='divider2' />
          <div className='each-row'>
            <p>
              <ion-icon name='aperture-outline'></ion-icon>{' '}
              {translations.popup.rp}:
            </p>
            <p className='facts'>{game.rp}</p>
          </div>
          <hr className='divider2' />
          <div className='each-row'>
            <p>
              <ion-icon name='body-outline'></ion-icon>
              {translations.popup.skins}:
            </p>
            <p className='facts'>{game.skins}</p>
          </div>
          <hr className='divider2' />
          <p>
            {translations.popup.extra}: {game.description}
          </p>
          <hr className='divider2' />
          <button className='sotib-olish'>{translations.popup.buy}</button>
        </div>
      </div>
    </div>
  );
};

export default PopUp;
