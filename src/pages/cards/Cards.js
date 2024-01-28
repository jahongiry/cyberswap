import React, { useState, useEffect } from 'react';
import './cards.css';
import logo1 from '../../component/header/logo1_1.png';
import pubg from '../../img/pubg.jpeg';
import { NavLink, Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faStar } from '@fortawesome/free-solid-svg-icons';
import Popup from './popup/Popup';
import { selectTranslations } from '../../slices/languageSlice';
import { useDispatch, useSelector } from 'react-redux';
import { fetchCards } from '../../slices/cardSlice';

const Cards = () => {
  const dispatch = useDispatch();
  const { cards, status, error } = useSelector((state) => state.cards);
  const translations = useSelector(selectTranslations);
  const [selectedGameId, setSelectedGameId] = useState(null);
  const togglePopUp = () => {
    setSelectedGameId(null);
  };

  useEffect(() => {
    dispatch(fetchCards());
  }, [dispatch]);

  const openPopUp = (id) => {
    setSelectedGameId(id);
  };

  const selectedGame = cards.find((game) => game.id === selectedGameId);

  if (status === 'loading') {
    return <div>Loading...</div>; // or any other loading indicator
  }

  if (status === 'failed') {
    return <div>Error: {error}</div>; // display the error message
  }

  return (
    <div className='cards-wrapper'>
      <div className='cards-container'>
        <div className='search-container'>
          <input
            type='text'
            placeholder={translations.cards.placeholder}
            className='search-input'
          />
          <button className='search-button'>{translations.cards.search}</button>
        </div>
        <h4 className='filterlash'>{translations.cards.filter}</h4>
        <div className='filter-container'>
          <button className='filter-button'>{translations.cards.new}</button>
          <button className='filter-button'>{translations.cards.cheap}</button>
          <button className='filter-button'>
            {translations.cards.expensive}
          </button>
        </div>
      </div>
      <div className='cards-section'>
        {cards.map((game) => (
          <div key={game.id} className='card'>
            <div className='card-img'>
              <img
                onClick={() => openPopUp(game.id)}
                className='card-img'
                src={game.images[0]}
                alt='image'
              />
            </div>
            <h5 onClick={() => openPopUp(game.id)}>{game.name}</h5>
            <p onClick={() => openPopUp(game.id)}>
              <span>Level:</span> {game.level}
            </p>
            <p onClick={() => openPopUp(game.id)}>
              <span>RP:</span> {game.royal_pass}
            </p>
            <p onClick={() => openPopUp(game.id)}>
              <span>Skins:</span> {game.skins}
            </p>
            <p onClick={() => openPopUp(game.id)}>
              <span>Owner:</span> {game.seller.username}
            </p>
            <div className='stars' onClick={() => openPopUp(game.id)}>
              <ion-icon name='star' className='icon-gold'></ion-icon>
              <ion-icon name='star' className='icon-gold'></ion-icon>
              <ion-icon name='star' className='icon-gold'></ion-icon>
              <ion-icon name='star' className='icon-gold'></ion-icon>
              <ion-icon name='star-half' className='icon-gold'></ion-icon>
            </div>
            <button onClick={() => openPopUp(game.id)} className='price-button'>
              {game.cost} UZS
            </button>
            {selectedGameId && (
              <Popup
                isVisible={Boolean(selectedGameId)}
                togglePopUp={togglePopUp}
                game={selectedGame}
                images={selectedGame.images}
                seller={selectedGame.seller}
              />
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Cards;
