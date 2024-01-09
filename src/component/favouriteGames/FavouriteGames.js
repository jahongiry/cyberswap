import React from "react";
import "./favouriteGames.css";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

// import game1 from "./img/game1.png";
import game2 from "./img/game2.png";
// import game3 from "./img/game3.png";

const PrevArrow = (props) => {
  const { onClick } = props;
  return (
    <div className="control-btn" onClick={onClick}>
      <i className="fa-solid fa-angle-left prev"></i>
    </div>
  );
};
const NextArrow = (props) => {
  const { onClick } = props;
  return (
    <div className="control-btn" onClick={onClick}>
      <i className="fa-solid fa-angle-right next"></i>
    </div>
  );
};

const FavouriteGames = () => {
  const settings = {
    className: "center",
    centerMode: true,
    infinite: true,
    centerPadding: "60px",
    slidesToShow: 3,
    speed: 500,

    dots: false,
    slidesToScroll: 1,
    autoplay: true,
    appenDots: (dots) => {
      return <ul style={{ margin: "0px" }}>{dots}</ul>;
    },
    nextArrow: <NextArrow />,
    prevArrow: <PrevArrow />,
  };

  return (
    <section className="favouriteGames">
      <h1 className="title">
        O'zingizga mos <br />
        <span>takliflarni</span> toping
      </h1>
      <p className="subtitle">
        Eng arzon va yuqori darajadagi pubg accountlar <br />
        Ishonchli va qiziquvchan haridorlar, real timedagi savdo
      </p>

      <div className="favouriteGames-container">
        <Slider {...settings}>
          <div className="favouriteGames-content">
            {/* <div className="favouriteGame-img">
            <img src={game1} alt="Game1" />
          </div> */}
          </div>
          <div className="favouriteGames-content">
            {/* <div className="favouriteGame-img">
            <img src={game1} alt="Game1" />
          </div> */}
          </div>

          <div className="favouriteGames-content">
            <div className="favouriteGame-img">
              <img src={game2} alt="Game1" />
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
              <p>sneak peeks</p>
            </div>
            {/* position frame end */}
          </div>

          <div className="favouriteGames-content">
            {/* <div className="favouriteGame-img">
            <img src={game3} alt="Game1" />
          </div> */}
          </div>
        </Slider>
      </div>

      <div className="favouriteGames-btns">
        <button className="btn">
          <span>Accountarni ko'rish</span>
        </button>
        <button className="btn">
          <span>Yangi e'lon yaratish</span>
        </button>
      </div>
    </section>
  );
};

export default FavouriteGames;
