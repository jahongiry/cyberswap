import React from 'react';
import './popup.css';

const PopUp = ({ isVisible, togglePopUp, game }) => {
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
            <h3>Owner: {game.owner}</h3>
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
          <h2>Account haqida</h2>
          <div className='each-row'>
            <p>
              <ion-icon name='id-card-outline'></ion-icon>Id:
            </p>
            <p className='facts'>{game.id}</p>
          </div>
          <hr className='divider2' />
          <div className='each-row'>
            <p>
              <ion-icon name='analytics-outline'></ion-icon>Level:
            </p>
            <p className='facts'>{game.level}</p>
          </div>
          <hr className='divider2' />
          <div className='each-row'>
            <p>
              <ion-icon name='aperture-outline'></ion-icon> RP:
            </p>
            <p className='facts'>{game.rp}</p>
          </div>
          <hr className='divider2' />
          <div className='each-row'>
            <p>
              <ion-icon name='body-outline'></ion-icon>Skins:
            </p>
            <p className='facts'>{game.skins}</p>
          </div>
          <hr className='divider2' />
          <p>Qo'shimcha malumotlar: {game.description}</p>
          <hr className='divider2' />
          <button className='sotib-olish'>SOTIB OLISH</button>
        </div>
      </div>
    </div>
  );
};

export default PopUp;
