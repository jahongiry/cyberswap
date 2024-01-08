import React from 'react';
import './testimonial.css';
import person1 from './img/person1.png';
import person2 from './img/person2.png';
import statusIcon from './img/statusIcon.png';

const Testimonial = () => {
  return (
    <section className='testimonial container'>
      <div className='testimonial-container'>
        {/* testimonial content 1 start */}
        <div className='testimonial-content'>
          <div className='testimonial-position'>
            <div className='icon1'></div>
            <div className='icon2'></div>
          </div>

          <div className='assess'>
            <i class='fa-solid fa-star'></i>
            <i class='fa-solid fa-star'></i>
            <i class='fa-solid fa-star'></i>
            <i class='fa-solid fa-star'></i>
            <i class='fa-solid fa-star'></i>
          </div>

          <p className='subtitle'>
            O'zbekistondagi ilk avtomatlashgan va eng ishonli platforma
          </p>

          <div className='line'></div>

          <div className='testimonial-footer'>
            <div className='testimonial-person'>
              <div className='person-img'>
                <img src={person1} alt='Arlene McCoy' />
              </div>
              <div className='info-box'>
                <p className='person-name'>Arlene McCoy</p>
                <span className='person-job'>McDonald's</span>
              </div>
            </div>

            <div className='testimonial-status'>
              <div className='icon'>
                <img src={statusIcon} alt='Verified' />
              </div>
              <span>Verified</span>
            </div>
          </div>
        </div>
        {/* testimonial content 1 end */}

        {/* testimonial content 2 start */}
        <div className='testimonial-content'>
          <div className='testimonial-position'>
            <div className='icon1'></div>
            <div className='icon2'></div>
          </div>

          <div className='assess'>
            <i class='fa-solid fa-star'></i>
            <i class='fa-solid fa-star'></i>
            <i class='fa-solid fa-star'></i>
            <i class='fa-solid fa-star'></i>
            <i class='fa-solid fa-star'></i>
          </div>

          <p className='subtitle'>
            Another aspect that sets this website apart is its vibrant and
            passionate community. The forum section provides a platform for
            gamers from all walks of life to connect, share their experiences,
            and discuss their favorite titles. I've made valuable friendships
            and found like-minded individuals who share my enthusiasm for
            gaming.
          </p>

          <div className='line'></div>

          <div className='testimonial-footer'>
            <div className='testimonial-person'>
              <div className='person-img'>
                <img src={person2} alt='Arlene McCoy' />
              </div>
              <div className='info-box'>
                <p className='person-name'>Kathryn Murphy</p>
                <span className='person-job'>General Electric</span>
              </div>
            </div>

            <div className='testimonial-status'>
              <div className='icon'>
                <img src={statusIcon} alt='Verified' />
              </div>
              <span>Verified</span>
            </div>
          </div>
        </div>
        {/* testimonial content 2 end */}
      </div>
    </section>
  );
};

export default Testimonial;
