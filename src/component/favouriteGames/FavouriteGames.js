import React from 'react';
import './favouriteGames.css';
import { NavLink, Link } from 'react-router-dom';
import Slider from './Slider';

const FavouriteGames = () => {
  return (
    <section className='favouriteGames'>
      <h1 className='title'>
        O'zingizga mos <br />
        <span>takliflarni</span> toping
      </h1>
      <p className='subtitle'>
        Eng arzon va yuqori darajadagi pubg accountlar <br />
        Ishonchli va qiziquvchan haridorlar, real timedagi savdo
      </p>

      <div className='favouriteGames-container'>
        <Slider />
      </div>
      <div className='favouriteGames-btns'>
        <Link to='/cards' className='cards-link'>
          <button className='btn'>
            <span>Accountarni ko'rish</span>
          </button>
        </Link>
        <Link to='/offer' className='cards-link'>
          <button className='btn'>
            <span>Yangi e'lon yaratish</span>
          </button>
        </Link>
      </div>
    </section>
  );
};

export default FavouriteGames;
