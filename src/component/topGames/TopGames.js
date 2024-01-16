import React from 'react';
import { Link } from 'react-router-dom';
import './topGames.css';
import game1 from './img/game1.png';
import game2 from './img/game2.png';
import game3 from './img/game3.png';
import game4 from './img/game4.png';
import game5 from './img/game5.png';
import game6 from './img/game6.png';
import player1 from './img/player1.png';
import player2 from './img/player2.png';
import player3 from './img/player3.png';
import player4 from './img/player4.png';
import player5 from './img/player5.png';
import player6 from './img/player6.png';

const TopGames = () => {
  return (
    <section className='topGames container'>
      <h1 className='title'>
        Eng saralangan <br />
        <span>e'lonlar</span>
      </h1>

      <div className='topGames-category'>
        <Link to='/offer' className='cards-link'>
          <button className='btn'>
            <span>PubG accountlar</span>
          </button>
        </Link>
        <Link to='/offer' className='cards-link'>
          <button className='btn'>
            <span>Telegram usernamelar</span>
          </button>
        </Link>
        <Link to='/offer' className='cards-link'>
          <button className='btn'>
            <span>Instagran usernamelar</span>
          </button>
        </Link>
      </div>

      <div className='topGames-container'>
        {/* game 1 start */}
        <div className='game-content'>
          <div className='topGame-img'>
            <img src={game1} alt='core philosophies' loading='lazy' />
          </div>
          <p className='game-name'>core philosophies</p>

          <div className='content'>
            <div className='player-img'>
              <div className='img'>
                <img src={player1} alt='player' loading='lazy' />
              </div>
            </div>
            <div className='player-info'>
              <p className='player-name'>Cameron Williamson</p>
              <span>Gillette</span>
            </div>
          </div>

          <Link className='btn'>
            <span>Live Demo</span>
          </Link>
        </div>
        {/* game 1 end */}
        {/* game 2 start */}
        <div className='game-content'>
          <div className='topGame-img'>
            <img src={game2} alt='core philosophies' loading='lazy' />
          </div>
          <p className='game-name'>core philosophies</p>

          <div className='content'>
            <div className='player-img'>
              <div className='img'>
                <img src={player2} alt='player' loading='lazy' />
              </div>
            </div>
            <div className='player-info'>
              <p className='player-name'>Cameron Williamson</p>
              <span>Gillette</span>
            </div>
          </div>

          <Link className='btn'>
            <span>Live Demo</span>
          </Link>
        </div>
        {/* game 2 end */}
        {/* game 3 start */}
        <div className='game-content'>
          <div className='topGame-img'>
            <img src={game3} alt='core philosophies' loading='lazy' />
          </div>
          <p className='game-name'>core philosophies</p>

          <div className='content'>
            <div className='player-img'>
              <div className='img'>
                <img src={player3} alt='player' loading='lazy' />
              </div>
            </div>
            <div className='player-info'>
              <p className='player-name'>Cameron Williamson</p>
              <span>Gillette</span>
            </div>
          </div>

          <Link className='btn'>
            <span>Live Demo</span>
          </Link>
        </div>
        {/* game 3 end */}
        {/* game 4 start */}
        <div className='game-content'>
          <div className='topGame-img'>
            <img src={game4} alt='core philosophies' loading='lazy' />
          </div>
          <p className='game-name'>core philosophies</p>

          <div className='content'>
            <div className='player-img'>
              <div className='img'>
                <img src={player4} alt='player' loading='lazy' />
              </div>
            </div>
            <div className='player-info'>
              <p className='player-name'>Cameron Williamson</p>
              <span>Gillette</span>
            </div>
          </div>

          <Link className='btn'>
            <span>Live Demo</span>
          </Link>
        </div>
        {/* game 4 end */}
        {/* game 5 start */}
        <div className='game-content'>
          <div className='topGame-img'>
            <img src={game5} alt='core philosophies' loading='lazy' />
          </div>
          <p className='game-name'>core philosophies</p>

          <div className='content'>
            <div className='player-img'>
              <div className='img'>
                <img src={player5} alt='player' loading='lazy' />
              </div>
            </div>
            <div className='player-info'>
              <p className='player-name'>Cameron Williamson</p>
              <span>Gillette</span>
            </div>
          </div>

          <Link className='btn'>
            <span>Live Demo</span>
          </Link>
        </div>
        {/* game 5 end */}
        {/* game 6 start */}
        <div className='game-content'>
          <div className='topGame-img'>
            <img src={game6} alt='core philosophies' loading='lazy' />
          </div>
          <p className='game-name'>core philosophies</p>

          <div className='content'>
            <div className='player-img'>
              <div className='img'>
                <img src={player6} alt='player' loading='lazy' />
              </div>
            </div>
            <div className='player-info'>
              <p className='player-name'>Cameron Williamson</p>
              <span>Gillette</span>
            </div>
          </div>

          <Link className='btn'>
            <span>Live Demo</span>
          </Link>
        </div>
        {/* game 6 end */}
      </div>
    </section>
  );
};

export default TopGames;
