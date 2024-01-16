import React from 'react';
import './recommendGame.css';
import gamePerson from './gamePerson.png';
import { NavLink, Link } from 'react-router-dom';

const RecommendGame = () => {
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
            Sifatli va arzon <br /> <span>PubG accountlar</span>
          </h1>
          <p className='subtitle'>
            Avtomatlashgan to'lov tizimi orqali soting va sotib oling, har bir
            elon telegram kanali orqali ham elon beriladi. Barcha sotuvchi va
            sotib oluvchi ma'lumotlari himoyalangan!
          </p>
          <Link to='/cards' className='cards-link'>
            <button className='btn'>
              <span>Barcha e'lonlarni ko'rish </span>
            </button>
          </Link>
        </div>
      </div>
    </section>
  );
};

export default RecommendGame;
