import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/pagination';
import { Pagination } from 'swiper/modules';
import './testimonial.css';
import statusIcon from './img/statusIcon.png';
import TestimonialsData from './TestimonialsData';
import { useSelector } from 'react-redux';
import { selectTranslations } from '../../slices/languageSlice';

const Testimonial = () => {
  const translations = useSelector(selectTranslations);

  return (
    <section className='testimonial container'>
      <div className='testimonial-container'>
        <Swiper
          slidesPerView={'auto'}
          spaceBetween={30}
          loop={true}
          pagination={{
            clickable: true,
          }}
          navigation={true}
          modules={[Pagination]}
          className='mySwiper'
        >
          {TestimonialsData.map((testimonialData) => {
            return (
              <SwiperSlide key={testimonialData.id}>
                <div className='testimonial-content'>
                  <div className='testimonial-position'>
                    <div className='icon1'></div>
                    <div className='icon2'></div>
                  </div>
                  <div className='assess'>
                    <i className='fa-solid fa-star'></i>
                    <i className='fa-solid fa-star'></i>
                    <i className='fa-solid fa-star'></i>
                    <i className='fa-solid fa-star'></i>
                    <i className='fa-solid fa-star'></i>
                  </div>

                  <p className='subtitle'>{testimonialData.subtitle}</p>

                  <div className='line'></div>

                  <div className='testimonial-footer'>
                    <div className='testimonial-person'>
                      <div className='person-img'>
                        <img
                          src={testimonialData.image}
                          alt={testimonialData.name}
                        />
                      </div>
                      <div className='info-box'>
                        <p className='person-name'>{testimonialData.name}</p>
                        <span className='person-job'>
                          {testimonialData.job}
                        </span>
                      </div>
                    </div>

                    <div className='testimonial-status'>
                      <div className='icon'>
                        <img src={statusIcon} alt={testimonialData.status} />
                      </div>
                      <span>{testimonialData.status}</span>
                    </div>
                  </div>
                </div>
              </SwiperSlide>
            );
          })}
        </Swiper>
      </div>
    </section>
  );
};

export default Testimonial;
