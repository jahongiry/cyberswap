import React, { useState } from 'react';
import './popup.css';
import { selectTranslations } from '../../../slices/languageSlice';
import { useSelector } from 'react-redux';
import image1 from '../../../img/pubg_page.png';
import image2 from '../../../img/pubg.jpeg';

const images = [image1, image2];

const PopUp = ({ isVisible, togglePopUp, game }) => {
  const translations = useSelector(selectTranslations);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  const transitionDelay = 300; // Delay in milliseconds

  const nextImage = () => {
    setTimeout(() => {
      setCurrentImageIndex((prevIndex) => (prevIndex + 1) % images.length);
    }, transitionDelay);
  };

  const prevImage = () => {
    setTimeout(() => {
      setCurrentImageIndex(
        (prevIndex) => (prevIndex - 1 + images.length) % images.length
      );
    }, transitionDelay);
  };
  const shouldRenderButtons = images.length > 1;
  if (!isVisible) return null;
  return (
    <div className='pop-up-overlay'>
      <div className='pop-up'>
        <button className='close' onClick={togglePopUp}>
          <ion-icon name='close-circle-outline'></ion-icon>
        </button>
        <div className='carousel-container'>
          {/* Conditionally render the left button */}
          {shouldRenderButtons && (
            <button className='carousel-btn left' onClick={prevImage}>
              &#10094;
            </button>
          )}
          <img
            src={images[currentImageIndex]}
            alt={`Slide ${currentImageIndex}`}
          />
          {/* Conditionally render the right button */}
          {shouldRenderButtons && (
            <button className='carousel-btn right' onClick={nextImage}>
              &#10095;
            </button>
          )}
        </div>
        <div className='top'>
          <img src={game.img} alt='game name' />
          <div>
            <h3>
              <span>{translations.popup.owner}:</span> {game.owner}
            </h3>
            <p>
              {translations.popup.lastseen} {game.lastSeen}
            </p>
            <div className='star-in-popup'>
              <ion-icon name='star'></ion-icon>
              <ion-icon name='star'></ion-icon>
              <ion-icon name='star'></ion-icon>
              <ion-icon name='star-half'></ion-icon>
              <ion-icon name='star-outline'></ion-icon>
              <span>(15)</span>
            </div>
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
