import React from "react";
import "./profile.css";
import profileImg from "./img/profile-img.png";

import ProfileOfferData from "./ProfileOfferData";

const Profile = () => {
  return (
    <div className="profile container">
      <div className="profile-wrapper">
        <div className="profile-header">
          <span>Profilingiz</span>
          <div className="img">
            <img src={profileImg} alt="user user" />
          </div>
        </div>
        <div className="profile-info">
          <h3 className="profile-name">Oddiy inson</h3>
          <p className="profile-detail">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Eos, velit
            sit! Eos nemo incidunt sequi velit earum nostrum aliquam iure
            voluptate. Quod amet repudiandae impedit!
          </p>

          <p className="profile-edit">Ma'lumotlarni o'zgartirish:</p>
          <div className="edit-btns">
            <button className="edit-phone">Telfon</button>
            <button className="edit-name">Ism</button>
            <button className="edit-detail">Men haqimda</button>
            <button className="edit-password">Parol</button>
          </div>
        </div>

        <div className="profile-container">
          <div className="profile-filter">
            <button className="profile-offer__btn active">E'lonlarim</button>
            <button className="profile-history__btn">Arxivlarim</button>
          </div>

          <div className="data-container">
            {ProfileOfferData.map((offerData) => {
              return (
                <div className="data-content" key={offerData.id}>
                  <div className="content-box">
                    <div className="content-img">
                      <img src={offerData.image} alt={offerData.name} />
                    </div>
                    <div className="content-info">
                      <p className="content-level">
                        Lvl: <span>{offerData.level}</span>
                      </p>
                      <p className="content-price">
                        Price: <span>{offerData.price}</span> so'm
                      </p>
                    </div>
                  </div>
                  <div className="content-info__edit">
                    <button className="delete-info__btn">
                      <ion-icon name="trash-outline"></ion-icon>
                    </button>
                    <button className="update-info__btn">Yangilash</button>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
