import React from 'react';
import './cards.css';
import logo1 from '../../component/header/logo1_1.png';
import pubg from '../../img/pubg.jpeg';
import { NavLink, Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faStar } from '@fortawesome/free-solid-svg-icons';

const Cards = () => {
  const games = [
    {
      id: 1,
      img: pubg,
      name: 'game1',
      level: 62,
      rp: '3 ta olingan',
      skins: "Juda ko'p",
      price: 2000,
      owner: 'Jahongir',
    },
    {
      id: 2,
      img: pubg,
      name: 'game1',
      level: 62,
      rp: '3 ta olingan',
      skins: "Juda ko'p",
      price: 2000,
      owner: 'Jahongir',
    },
    {
      id: 3,
      img: pubg,
      name: 'game1',
      level: 62,
      rp: '3 ta olingan',
      skins: "Juda ko'p",
      price: 2000,
      owner: 'Jahongir',
    },
    {
      id: 4,
      img: pubg,
      name: 'game1',
      level: 62,
      rp: '3 ta olingan',
      skins: "Juda ko'p",
      price: 2000,
      owner: 'Jahongir',
    },
  ];
  return (
    <div>
      <div className='cards-container'>
        <div className='search-container'>
          <input
            type='text'
            placeholder="Kerakli so'zini yozing"
            className='search-input'
          />
          <button className='search-button'>Qidirish</button>
        </div>
        <h4 className='filterlash'>Filterlash</h4>
        <div className='filter-container'>
          <button className='filter-button active'>Mashxurlar</button>
          <button className='filter-button'>Yangilari</button>
          <button className='filter-button'>Arzonlari</button>
          <button className='filter-button'>Qimmatlari</button>
        </div>
      </div>
      <div className='cards-section'>
        {games.map((game) => (
          <div key={game.id} className='card'>
            <img className='card-img' src={game.img} alt='image' />
            <h5>{game.name}</h5>
            <p>Level: {game.level}</p>
            <p>RP: {game.rp}</p>
            <p>Skins: {game.skins}</p>
            <p>Owner: {game.owner}</p>
            <div className='stars'>
              <FontAwesomeIcon icon={faStar} className='icon-gold' />
              <FontAwesomeIcon icon={faStar} className='icon-gold' />
              <FontAwesomeIcon icon={faStar} className='icon-gold' />
              <FontAwesomeIcon icon={faStar} className='icon-gold' />
              <FontAwesomeIcon icon={faStar} className='icon-gold' />
            </div>
            <button className='price-button'>{game.price} UZS</button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Cards;
