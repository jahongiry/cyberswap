import React from "react";
import FavouriteGames from "../../component/favouriteGames/FavouriteGames";
import MainSection from "../../component/mainSection/MainSection";
import RecommendGame from "../../component/recommendGame/RecommendGame";
import Testimonial from "../../component/testimonials/Testimonial";
import TopGames from "../../component/topGames/TopGames";
import "./home.css";

const Home = () => {
  return (
    <div className="home" id="home">
      <MainSection />
      <FavouriteGames />
      <RecommendGame />
      <TopGames />
      <Testimonial />
    </div>
  );
};

export default Home;
