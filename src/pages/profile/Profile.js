import React from 'react';
import './profile.css';
import profileImg from '../../img/halmet.png';
import ProfileOfferData from './ProfileOfferData';
import { logOutUser } from '../../slices/authSlice';
import { useDispatch } from 'react-redux';
import { NavLink } from 'react-router-dom';

import { selectTranslations } from '../../slices/languageSlice';
import { useSelector } from 'react-redux';


const Profile = () => {
  const dispatch = useDispatch();
  const translations = useSelector(selectTranslations);
  const handleLogout = () => {
    dispatch(logOutUser());
  };

  return (
    <div className='profile container'>
      <div className='profile-wrapper'>
        <div className='profile-header'>
          <NavLink className='chiqish' onClick={handleLogout} to='/'>
            <ion-icon name='arrow-back-circle-outline'></ion-icon>
            <span>{translations.profile.exit}</span>
          </NavLink>
          <span>{translations.profile.span1}</span>
          <div className='img'>
            <img src={profileImg} alt='user user' />
          </div>
        </div>
        <div className='profile-info'>
          <h3 className='profile-name'>Oddiy inson</h3>
          <p className='profile-detail'>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Eos, velit
            sit! Eos nemo incidunt sequi velit earum nostrum aliquam iure
            voluptate. Quod amet repudiandae impedit!
          </p>

          <p className='profile-edit'>{translations.profile.profileEdit}:</p>
          <div className='edit-btns'>
            <button className='edit-phone'>{translations.profile.editPhone}</button>
            <button className='edit-name'>{translations.profile.editName}</button>
            <button className='edit-detail'>{translations.profile.editDetail}</button>
            <button className='edit-password'>{translations.profile.editPassword}</button>
          </div>
        </div>

        <div className='profile-container'>
          <div className='profile-filter'>
            <button className='profile-offer__btn active'>{translations.profile.profileOffer}</button>
            <button className='profile-history__btn'>{translations.profile.profileHistory}</button>
          </div>

          <div className='data-container'>
            {ProfileOfferData.map((offerData) => {
              return (
                <div className='data-content' key={offerData.id}>
                  <div className='content-box'>
                    <div className='content-img'>
                      <img src={offerData.image} alt={offerData.name} />
                    </div>
                    <div className='content-info'>
                      <p className='content-level'>
                      {translations.profile.level}: <span>{offerData.level}</span>
                      </p>
                      <p className='content-price'>
                      {translations.profile.price}: <span>{offerData.price}</span> so'm
                      </p>
                    </div>
                  </div>
                  <div className='content-info__edit'>
                    <button className='delete-info__btn'>
                      <ion-icon name='trash-outline'></ion-icon>
                    </button>
                    <button className='update-info__btn'>{translations.profile.updateInfo}</button>
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
