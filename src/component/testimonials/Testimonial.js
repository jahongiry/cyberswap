import React from 'react';
import './testimonial.css';
import person1 from './img/author1.png';
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
            O'zbekistondagi ilk avtomatlashgan va eng ishonli platforma va
            accountlar almashinuvida har xil aldanishlar bolmaydi. cyberswap.uz
            digital mahsulotlarni almashinuvida katta segment boladi deb
            oylayman!
          </p>

          <div className='line'></div>

          <div className='testimonial-footer'>
            <div className='testimonial-person'>
              <div className='person-img'>
                <img src={person1} alt='Jahongir Yusupov' />
              </div>
              <div className='info-box'>
                <p className='person-name'>Jahongir Yusupov</p>
                <span className='person-job'>Algoritm talim</span>
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
            Accountlar almashinuvida juda ko'plab aldashlar va ko'cha tili bilan
            aytkanda masheniklar ko'payib ketkan. Bu platformadan foydalanib
            garant yol bilan sotuvchilar va sotib oluvchilar bemalol savdo
            qilishlari mumkin!
          </p>

          <div className='line'></div>

          <div className='testimonial-footer'>
            <div className='testimonial-person'>
              <div className='person-img'>
                <img src={person2} alt='Arlene McCoy' />
              </div>
              <div className='info-box'>
                <p className='person-name'>Sanjar Holmirzayev</p>
                <span className='person-job'>Dasturchi</span>
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
