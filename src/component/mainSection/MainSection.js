import React from "react";
import "./mainSection.css";

const MainSection = () => {
  return (
    <section className="mainSection container">
      <div className="home-container">
        <h1 className="title">
          Let your <br />mind <span>explore</span><br />new world
        </h1>
        <p className="subtitle">
          Playing electronic games, whether through consoles, computers, mobile
          phones or another medium altogether. Gaming is a nuanced term that
          suggests regular gameplay, possibly as a hobby.
        </p>

        <div className="home-btns">
          <button className="btn">
            <span>Buy now</span>
          </button>
          <button className="btn">
            <span>Play now</span>
          </button>
        </div>
        
        <div className="statistics">
          <div className="content">
            <h3>300+</h3>
            <p>Unique style</p>
          </div>
          <div className="content project">
            <h3>200+</h3>
            <p>Project finished</p>
          </div>
          <div className="content">
            <h3>500+</h3>
            <p>Happy customer</p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default MainSection;
