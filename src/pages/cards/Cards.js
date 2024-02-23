import React, { useState, useEffect } from 'react';
import './cards.css';
import logo1 from '../../component/header/logo1_1.png';
import pubg from '../../img/pubg.jpeg';
import { NavLink, Link } from 'react-router-dom';
import Popup from './popup/Popup';
import { selectTranslations } from '../../slices/languageSlice';
import { useDispatch, useSelector } from 'react-redux';
import { fetchCards } from '../../slices/cardSlice';
import Loader from '../../component/loader/Loader2';
import PrePayment from './prePayment/prePayment';
import WinterPubg from '../../img/pubg_winter.avif';
import WinterPubg2 from '../../img//Winterpubg.webp';
import { useParams, useNavigate } from 'react-router-dom';

const Cards = () => {
  const dispatch = useDispatch();
  const { cards, status, error } = useSelector((state) => state.cards);
  const translations = useSelector(selectTranslations);
  const [selectedGameId, setSelectedGameId] = useState(null);
  const [selectedGameToPay, setSelectedGameToPay] = useState(null);
  const [showPrePayment, setShowPrePayment] = useState(false);
  const selectedGame = cards.find((game) => game.id === selectedGameId);
  const [selectedCategory, setSelectedCategory] = useState(null);

  const { gameId } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    dispatch(fetchCards());
    if (gameId) {
      setSelectedGameId(gameId);
    }
  }, [dispatch, gameId]);

  const handleCategoryClick = (category) => {
    setSelectedCategory(category);
  };

  const togglePopUp = () => {
    setSelectedGameId(null);
    navigate('/cards');
  };

  useEffect(() => {
    dispatch(fetchCards());
  }, [dispatch]);

  const openPopUp = (id) => {
    setSelectedGameId(id);
    navigate(`/cards/${id}`);
  };

  const openPrePayment = () => {
    setShowPrePayment(true);
    setSelectedGameToPay(selectedGame);
    setSelectedGameId(null);
  };

  const closePrePayment = () => {
    setShowPrePayment(false);
  };

  if (status === 'loading') {
    return (
      <div>
        <Loader />
      </div>
    );
  }

  if (status === 'failed') {
    console.log(error);
    return <div>Error: {error}</div>;
  }

  return (
    <div className='cards-wrapper'>
      <div className='cards-container'>
        <img src={WinterPubg2} alt='Pubg background' />
        <div className='search-container'>
          <input
            type='text'
            placeholder={translations.cards.placeholder}
            className='search-input'
          />
          <button className='search-button'>{translations.cards.search}</button>
        </div>
        <div className='category-container'>
          <button
            className={`category-button ${
              selectedCategory === 'UC' ? 'active' : ''
            }`}
            onClick={() => handleCategoryClick('UC')}
          >
            UC
          </button>
          <button
            className={`category-button ${
              selectedCategory === 'Accounts' ? 'active' : ''
            }`}
            onClick={() => handleCategoryClick('Accounts')}
          >
            Accounts
          </button>
        </div>
        {selectedCategory && (
          <>
            {/* <h4 className='filterlash'>{translations.cards.filter}</h4> */}
            <div
              className={`filter-container ${selectedCategory ? 'active' : ''}`}
            >
              <button className='filter-button'>
                <ion-icon name='sparkles-outline'></ion-icon>
                {translations.cards.new}
              </button>
              <button className='filter-button'>
                <ion-icon name='trending-up-outline'></ion-icon>
                {translations.cards.cheap}
              </button>
              <button className='filter-button'>
                <ion-icon name='trending-down-outline'></ion-icon>
                {translations.cards.expensive}
              </button>
            </div>
          </>
        )}
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
              <span>{translations.cards.level}:</span> {game.level}
            </p>
            <p onClick={() => openPopUp(game.id)}>
              <span>{translations.cards.rp}:</span> {game.royal_pass}
            </p>
            <p onClick={() => openPopUp(game.id)}>
              <span>{translations.cards.skins}:</span> {game.skins}
            </p>
            <p onClick={() => openPopUp(game.id)}>
              <span>{translations.cards.owner}:</span> {game.seller.username}
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
                openPrePayment={openPrePayment}
              />
            )}
            {showPrePayment && (
              <PrePayment
                game={selectedGameToPay}
                closePrePayment={closePrePayment}
              />
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Cards;
