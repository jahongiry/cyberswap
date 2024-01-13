import React from "react";
// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/effect-coverflow";
import "swiper/css/pagination";

// Import FavouriteGames Data
import favouriteGamesData from "./FavouriteGamesData";
import "./favouriteGames.css";

// import required modules
import { EffectCoverflow, Pagination } from "swiper/modules";

const Slider = () => {
  return (
    <Swiper
      effect={"coverflow"}
      grabCursor={true}
      centeredSlides={true}
      loop={true}
      slidesPerView={"3"}
      coverflowEffect={{
        rotate: 50,
        stretch: 0,
        depth: 100,
        modifier: 1,
        slideShadows: true,
      }}
      pagination={{
        clickable: true,
      }}
      modules={[EffectCoverflow, Pagination]}
      className="mySwiper"
    >
      {favouriteGamesData.map((favouriteGame) => (
        <SwiperSlide key={favouriteGame.id}>
          <div className="favouriteGames-content">
            <div className="favouriteGame-img">
              <img src={favouriteGame.image} alt={favouriteGame.name} />
            </div>

            {/* position frame start */}
            <div className="left-side position-side position-frame">
              <div></div>
              <div></div>
              <div></div>
              <div></div>
              <div></div>
              <div></div>
              <div></div>
              <div></div>
            </div>
            <div className="right-side position-side position-frame">
              <div></div>
              <div></div>
              <div></div>
              <div></div>
              <div></div>
              <div></div>
              <div></div>
              <div></div>
            </div>
            <div className="top-center position-frame">
              <i className="fa-solid fa-gamepad"></i>
            </div>
            <div className="top-left__side position-side position-frame">
              <div></div>
              <div></div>
              <div></div>
              <div></div>
              <div></div>
            </div>
            <div className="top-right__side position-side position-frame">
              <div></div>
              <div></div>
              <div></div>
              <div></div>
              <div></div>
            </div>

            <div className="bottom-center position-frame">
              <p>{favouriteGame.name}</p>
            </div>
            {/* position frame end */}
          </div>
        </SwiperSlide>
      ))}
    </Swiper>
  );
};

export default Slider;
