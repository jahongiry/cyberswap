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
import settings_icon from '../../img/icons/settings-outline.svg';

const Cards = () => {
  const dispatch = useDispatch();
  const { cards, status, error } = useSelector((state) => state.cards);
  const translations = useSelector(selectTranslations);
  const [selectedGameId, setSelectedGameId] = useState(null);
  const [selectedGameToPay, setSelectedGameToPay] = useState(null);
  const [showPrePayment, setShowPrePayment] = useState(false);
  const selectedGame = cards.find((game) => game.id === selectedGameId);
  const [selectedCategory, setSelectedCategory] = useState('ALL');
  const [sortingFilter, setSortingFilter] = useState('new');
  const [settings, setSettings] = useState(false);
  const [searchInput, setSearchInput] = useState('');
  const { gameId } = useParams();
  const navigate = useNavigate();

  const PUBG_ACCOUNT = 'pubg_account';
  const PUBG_UC = 'pubg_uc';

  useEffect(() => {
    dispatch(fetchCards());
    if (gameId) {
      setSelectedGameId(gameId);
    }
  }, [dispatch, gameId]);

  const handleCategoryClick = (category) => {
    setSelectedCategory(category);
  };

  const handleSettingsClick = () => {
    setSettings(!settings);
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

  const handleSearchInputChange = (e) => {
    setSearchInput(e.target.value.toLowerCase());
  };

  const sortedAndFilteredCards = cards
    .filter((game) => {
      const matchesCategory =
        selectedCategory === 'ALL' || game.offer_type === selectedCategory;

      const level = game.level?.toString().toLowerCase() || '';
      const userName = game.seller.username?.toString().toLowerCase() || '';
      const quantity = game.quantity?.toString().toLowerCase() || '';
      const royalPass = game.royal_pass?.toLowerCase() || '';
      const matchesSearch =
        searchInput.length === 0 ||
        level.includes(searchInput) ||
        userName.includes(searchInput) ||
        quantity.includes(searchInput) ||
        royalPass.includes(searchInput);

      return matchesCategory && matchesSearch;
    })
    .sort((a, b) => {
      if (sortingFilter === 'cheap') {
        return a.cost - b.cost;
      } else if (sortingFilter === 'expensive') {
        return b.cost - a.cost;
      } else if (sortingFilter === 'new') {
        return (
          new Date(b.created_at).getTime() - new Date(a.created_at).getTime()
        );
      }
      return 0;
    });

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
        <div className='card-img__bg'>
          <img src={WinterPubg2} alt='Pubg Mobile' />
        </div>

        <div className='search-container'>
          <input
            type='text'
            placeholder={translations.cards.placeholder}
            className='search-input'
            onChange={handleSearchInputChange}
          />
          <button className='search-button'>{translations.cards.search}</button>
        </div>

        <div className='category-container'>
          <button
            className={`category-button ${
              selectedCategory === 'ALL' ? 'active' : ''
            }`}
            onClick={() => handleCategoryClick('ALL')}
          >
            {translations.cards.all}
          </button>
          <button
            className={`category-button ${
              selectedCategory === PUBG_UC ? 'active' : ''
            }`}
            onClick={() => handleCategoryClick(PUBG_UC)}
          >
            UC
          </button>
          <button
            className={`category-button ${
              selectedCategory === PUBG_ACCOUNT ? 'active' : ''
            }`}
            onClick={() => handleCategoryClick(PUBG_ACCOUNT)}
          >
            Accounts
          </button>
          <button className='settings' onClick={() => handleSettingsClick()}>
            <img src={settings_icon} alt='settings icon' />
          </button>
        </div>
        <div className={`filter-container ${settings ? 'active' : ''}`}>
          <button
            className={`filter-button ${
              sortingFilter == 'new' ? 'active' : ''
            }`}
            onClick={() => setSortingFilter('new')}
          >
            <ion-icon name='sparkles-outline'></ion-icon>
            {translations.cards.new}
          </button>
          <button
            className={`filter-button ${
              sortingFilter == 'cheap' ? 'active' : ''
            }`}
            onClick={() => setSortingFilter('cheap')}
          >
            <ion-icon name='trending-up-outline'></ion-icon>
            {translations.cards.cheap}
          </button>
          <button
            className={`filter-button ${
              sortingFilter == 'expensive' ? 'active' : ''
            }`}
            onClick={() => setSortingFilter('expensive')}
          >
            <ion-icon name='trending-down-outline'></ion-icon>
            {translations.cards.expensive}
          </button>
        </div>
      </div>

      <div className='cards-section'>
        {sortedAndFilteredCards.map((game) => (
          <div key={game.id} className='card'>
            <div className='card-img'>
              <img
                onClick={() => openPopUp(game.id)}
                className='card-img'
                src={game.images[0]}
                alt='image'
              />
            </div>
            {game.level && (
              <p onClick={() => openPopUp(game.id)}>
                <span>{translations.cards.level}:</span> {game.level}
              </p>
            )}
            {game.quantity && (
              <p onClick={() => openPopUp(game.id)}>
                <span>{translations.cards.uc_quantity}:</span> {game.quantity}
              </p>
            )}
            {game.royal_pass && (
              <p onClick={() => openPopUp(game.id)}>
                <span>{translations.cards.rp}:</span> {game.royal_pass}
              </p>
            )}
            {game.transfer_time && (
              <p onClick={() => openPopUp(game.id)}>
                <span>{translations.cards.transfer_time}:</span>
                {game.transfer_time}
              </p>
            )}
            {game.skins && (
              <p onClick={() => openPopUp(game.id)}>
                <span>{translations.cards.skins}:</span> {game.skins}
              </p>
            )}
            {game.available_time && (
              <p onClick={() => openPopUp(game.id)}>
                <span>{translations.cards.available_time}:</span>
                {game.available_time}
              </p>
            )}
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
