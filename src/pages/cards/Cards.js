import React from 'react';
import './cards.css';
import logo1 from '../../component/header/logo1_1.png';
import { NavLink, Link } from 'react-router-dom';

const Cards = () => {
  return (
    <div className='cards-container'>
      <div className='search-container'>
        <input
          type='text'
          placeholder="Kerakli so'zini yozing"
          className='search-input'
        />
        <button className='search-button'>Qidirish</button>
      </div>
      <h4>Filterlash</h4>
      <div className='filter-container'>
        <button className='filter-button active'>Mashxurlar</button>
        <button className='filter-button'>Yangilari</button>
        <button className='filter-button'>Arzonlari</button>
        <button className='filter-button'>Qimmatlari</button>
      </div>
    </div>
  );
};

export default Cards;
