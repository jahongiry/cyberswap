import React, { useState } from "react";
import "./cards.css";
import logo1 from "../../component/header/logo1_1.png";
import pubg from "../../img/pubg.jpeg";
import { NavLink, Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faStar } from "@fortawesome/free-solid-svg-icons";
import Popup from "./popup/Popup";

const Cards = () => {
  const [selectedGameId, setSelectedGameId] = useState(null);

  const togglePopUp = () => {
    setSelectedGameId(null); // This will only be used to close the Popup
  };

  const games = [
    {
      id: 1,
      img: pubg,
      name: "game1",
      level: 62,
      rp: "3 ta olingan",
      skins: "Juda ko'p",
      price: 2000,
      owner: "Jahongir",
      description: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Nobis, ipsa!",
    },
    {
      id: 2,
      img: pubg,
      name: "game1",
      level: 62,
      rp: "3 ta olingan",
      skins: "Juda ko'p",
      price: 2000,
      owner: "Jahongir",
      description: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Nobis, ipsa!",
    },
    {
      id: 3,
      img: pubg,
      name: "game1",
      level: 62,
      rp: "3 ta olingan",
      skins: "Juda ko'p",
      price: 2000,
      owner: "Jahongir",
      description: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Nobis, ipsa!",
    },
    {
      id: 4,
      img: pubg,
      name: "game1",
      level: 62,
      rp: "3 ta olingan",
      skins: "Juda ko'p",
      price: 2000,
      owner: "Jahongir",
      description: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Nobis, ipsa!",
    },
  ];

  const openPopUp = (id) => {
    setSelectedGameId(id);
  };
  const selectedGame = games.find((game) => game.id === selectedGameId);

  return (
    <div className="cards-wrapper">
      <div className="cards-container">
        <div className="search-container">
          <input
            type="text"
            placeholder="Kerakli so'zini yozing"
            className="search-input"
          />
          <button className="search-button">Qidirish</button>
        </div>
        <h4 className="filterlash">Filterlash</h4>
        <div className="filter-container">
          <button className="filter-button active">Mashxurlar</button>
          <button className="filter-button">Yangilari</button>
          <button className="filter-button">Arzonlari</button>
          <button className="filter-button">Qimmatlari</button>
        </div>
      </div>
      <div className="cards-section">
        {games.map((game) => (
          <div key={game.id} className="card">
            <div className="card-img">
              <img
                onClick={() => openPopUp(game.id)}
                className="card-img"
                src={game.img}
                alt="image"
              />
            </div>
            <h5 onClick={() => openPopUp(game.id)}>{game.name}</h5>
            <p onClick={() => openPopUp(game.id)}>
              <span>Level:</span> {game.level}
            </p>
            <p onClick={() => openPopUp(game.id)}>
              <span>RP:</span> {game.rp}
            </p>
            <p onClick={() => openPopUp(game.id)}>
              <span>Skins:</span> {game.skins}
            </p>
            <p onClick={() => openPopUp(game.id)}>
              <span>Owner:</span> {game.owner}
            </p>
            <div className="stars" onClick={() => openPopUp(game.id)}>
              <ion-icon name="star" className="icon-gold"></ion-icon>
              <ion-icon name="star" className="icon-gold"></ion-icon>
              <ion-icon name="star" className="icon-gold"></ion-icon>
              <ion-icon name="star" className="icon-gold"></ion-icon>
              <ion-icon name="star-half" className="icon-gold"></ion-icon>
            </div>
            <button onClick={() => openPopUp(game.id)} className="price-button">
              {game.price} UZS
            </button>
            {selectedGameId && (
              <Popup
                isVisible={Boolean(selectedGameId)}
                togglePopUp={togglePopUp}
                game={selectedGame} // Pass the selectedGame object to the Popup
              />
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Cards;
