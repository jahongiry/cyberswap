import React from "react";
import "./favouriteGames.css";

const FavouriteGames = () => {
  return (
    <section className="favouriteGames">
      <h1 className="title">
        choose your <br />
        <span>favorite</span> games
      </h1>
      <p className="subtitle">
        Offer sneak peeks and previews of upcoming games, including <br />
        trailers, screenshots, and information about release.
      </p>

      <div className="favouriteGames-container"></div>

      <div className="favouriteGames-btns">
        <button className="btn">
          <span>View All</span>
        </button>
        <button className="btn">
          <span>Play now</span>
        </button>
      </div>
    </section>
  );
};

export default FavouriteGames;
