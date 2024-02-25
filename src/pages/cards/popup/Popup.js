import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import './popup.css';
import { selectTranslations } from '../../../slices/languageSlice';
import { useSelector } from 'react-redux';
import image1 from '../../../img/pubg_page.png';
import image2 from '../../../img/pubg.jpeg';

const PopUp = ({
  isVisible,
  togglePopUp,
  game,
  images,
  seller,
  openPrePayment,
}) => {
  const translations = useSelector(selectTranslations);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const navigate = useNavigate();
  const transitionDelay = 300;
  const handleClose = () => {
    togglePopUp();
    navigate('/cards');
  };

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
  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: 'Check out this game!',
          url: window.location.href,
        });
        console.log('Page shared successfully');
      } catch (error) {
        console.error('Error in sharing', error);
      }
    } else {
      console.log('Web Share API not supported');
    }
  };

  if (!isVisible) return null;
  return (
    <div className='pop-up-overlay'>
      <div className='pop-up__container'>
        <div className='pop-up'>
          <button className='close' onClick={handleClose}>
            <ion-icon name='close-circle-outline'></ion-icon>
          </button>
          <div className='carousel-container'>
            {shouldRenderButtons && (
              <button className='carousel-btn left' onClick={prevImage}>
                &#10094;
              </button>
            )}
            <img
              src={images[currentImageIndex]}
              alt={`Slide ${currentImageIndex}`}
            />
            {shouldRenderButtons && (
              <button className='carousel-btn right' onClick={nextImage}>
                &#10095;
              </button>
            )}
          </div>
          <div className='top'>
            <img src={game.seller.image} alt='game name' />
            <div>
              <h3>
                <span>{translations.popup.owner}:</span> {game.seller.username}
              </h3>
              <p>
                {translations.popup.lastseen} {seller.signed_at}
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
            {navigator.share && (
              <button className='share-button' onClick={handleShare}>
                Share
                <ion-icon name='share-social-outline'></ion-icon>
              </button>
            )}
            <h2>{translations.popup.about}</h2>
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
              <ul className='facts'>
                {game.royal_pass.map((rp, index) => (
                  <li key={index}>{rp}</li>
                ))}
              </ul>
            </div>
            <hr className='divider2' />
            <div className='each-row'>
              <p>
                <ion-icon name='body-outline'></ion-icon>
                {translations.popup.skins}:
              </p>
              <div className='facts'>
                {game.skins.map((skin, index) => (
                  <p key={index}>{skin}</p>
                ))}
              </div>
            </div>
            <hr className='divider2' />
            <div className='each-row'>
              <p>
                <ion-icon name='flame-outline'></ion-icon>
                {translations.popup.extra}: <br />
              </p>
              <p className='facts'>{game.description}</p>
            </div>
            <hr className='divider2' />
            <button className='sotib-olish' onClick={openPrePayment}>
              {translations.popup.buy}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PopUp;
