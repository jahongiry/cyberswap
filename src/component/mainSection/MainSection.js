import React from "react";
import "./mainSection.css";
import homeImg from "./logo1_1.png";

const MainSection = () => {
  return (
    <section className="mainSection container">
      <div className="home-container">
        <div className="home-container__info">
          <h1 className="title">
            biz bilan <br />
            <span>"Kiber savdo"</span>
            <br />
            Garant va Ishonchli
          </h1>
          <p className="subtitle">
            Oyin accountlari, Telegram nomlar va kanallar, Instagram nomlarini
            havsiz soting va sotib oling!
          </p>

          <div className="home-btns">
            <button className="btn">
              <span>Elon berish/Sotish</span>
            </button>
            <button className="btn">
              <span>Sotib olish</span>
            </button>
          </div>
          <div className="statistics">
            <div className="content">
              <h3>100+</h3>
              <p>Pubg accountlar</p>
            </div>
            <div className="content project">
              <h3>100+</h3>
              <p>Ishonchli sotuvchilar</p>
            </div>
            <div className="content">
              <h3>500+</h3>
              <p>Sotilgan accountlar</p>
            </div>
          </div>
        </div>

        <div className="home-container__img">
          <div className="home-img">
            <img src={homeImg} alt="Game" />
          </div>
        </div>
      </div>
      
      <div className="statistics">
        <div className="content">
          <h3>100+</h3>
          <p>Pubg accountlar</p>
        </div>
        <div className="content project">
          <h3>100+</h3>
          <p>Ishonchli sotuvchilar</p>
        </div>
        <div className="content">
          <h3>500+</h3>
          <p>Sotilgan accountlar</p>
        </div>
      </div>
    </section>
  );
};

export default MainSection;
