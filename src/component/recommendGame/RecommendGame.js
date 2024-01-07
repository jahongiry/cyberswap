import React from "react";
import "./recommendGame.css";
import gamePerson from "./gamePerson.png";

const RecommendGame = () => {
  return (
    <section className="recommendGame container">
      <div className="recommend-container">

        <div className="recommendGame-img">
          <div className="game-img">
            <img src={gamePerson} alt="Virtual reality gaming." loading="lazy" />
          </div>
        </div>

        <div className="recommend-content">
          <h1 className="title">
            Discover the <span>Virtual</span> Reality Gaming
          </h1>
          <p className="subtitle">
            A well-designed gaming header often incorporates elements such as
            game characters, iconic symbols, vibrant colors, and dynamic visuals
            to convey excitement, adventure, and the immersive nature of gaming.
          </p>

          <button className="btn">
            <span>View All</span>
          </button>
        </div>
      </div>
    </section>
  );
};

export default RecommendGame;
