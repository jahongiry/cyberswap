import React, { useState, useEffect } from 'react';
import './profile.css';
import profileImg from '../../img/halmet.png';
import ProfileOfferData from './ProfileOfferData';
import {
  logOutUser,
  selectCurrentUser,
  checkLogIn,
} from '../../slices/authSlice';
import {
  updateUsername,
  updatePassword,
  updateProfileImage,
  fetchOffer,
  getUserOffers,
  deleteOffer,
  errorState,
} from '../../slices/profileSlice';
import { useDispatch } from 'react-redux';
import { NavLink, Link } from 'react-router-dom';
import { selectTranslations } from '../../slices/languageSlice';
import { useSelector } from 'react-redux';
import Loader from '../../component/loader/Loader2';
import EditUsernamePopup from './popupName/popupName';
import EditPasswordPopup from './popupPassword/popupPassword';
import ConfirmationPopup from './offerDeletePopUp';
import EditOffer from './popupOffer/popupOffer';

const Profile = () => {
  const dispatch = useDispatch();
  const translations = useSelector(selectTranslations);
  const currentUser = useSelector(selectCurrentUser);
  const offers = useSelector(getUserOffers);
  const [showEditButtons, setShowEditButtons] = useState(false);
  const [isEditPopupVisible, setIsEditPopupVisible] = useState(false);
  const [isEditPasswordPopupVisible, setIsEditPasswordPopupVisible] =
    useState(false);
  const [isConfirmPopupOpen, setIsConfirmPopupOpen] = useState(false);
  const [selectedOfferId, setSelectedOfferId] = useState(null);
  const [isEditOfferPopupVisible, setIsEditOfferPopupVisible] = useState(false);
  const [selectedOffer, setSelectedOffer] = useState(null);

  const handleEditOfferClick = (offerData) => {
    setSelectedOffer(offerData);
    setIsEditOfferPopupVisible(true);
  };

  const handleCloseEditOfferPopup = () => {
    setIsEditOfferPopupVisible(false);
  };

  const handleDeleteClick = (offerId) => {
    setIsConfirmPopupOpen(true);
    setSelectedOfferId(offerId);
  };

  const handleDeleteConfirm = () => {
    dispatch(deleteOffer(selectedOfferId)).then(() => {
      dispatch(fetchOffer());
    });
    setIsConfirmPopupOpen(false);
    setSelectedOfferId(null);
  };

  const handleDeleteCancel = () => {
    setIsConfirmPopupOpen(false);
    setSelectedOfferId(null);
  };

  const handleImageChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      dispatch(updateProfileImage(file)).then(() => {
        dispatch(checkLogIn());
      });
    }
  };

  const handleImageClick = () => {
    document.getElementById('imageInput').click();
  };

  const handleEditPasswordClick = () => {
    setIsEditPasswordPopupVisible(true);
  };

  const handleClosePasswordPopup = () => {
    setIsEditPasswordPopupVisible(false);
  };

  const handlePasswordSubmit = ({ oldPassword, newPassword }) => {
    dispatch(updatePassword({ oldPassword, newPassword })).then(() => {
      dispatch(checkLogIn());
    });
    setIsEditPasswordPopupVisible(false);
  };

  const handleEditNameClick = () => {
    setIsEditPopupVisible(true);
  };

  const handleClosePopup = () => {
    setIsEditPopupVisible(false);
  };

  const handleUsernameSubmit = (newUsername) => {
    dispatch(updateUsername(newUsername)).then(() => {
      dispatch(checkLogIn());
    });
    setIsEditPopupVisible(false);
  };

  const handleLogout = () => {
    dispatch(logOutUser());
  };

  useEffect(() => {
    if (!currentUser) {
      dispatch(checkLogIn());
    }
  }, [dispatch, currentUser]);

  const toggleEditButtons = () => {
    setShowEditButtons(!showEditButtons);
  };

  useEffect(() => {
    dispatch(fetchOffer());
  }, [dispatch]);

  if (!currentUser) {
    return (
      <div>
        <Loader />
      </div>
    );
  }
  return (
    <div className='profile container'>
      <div className='profile-wrapper'>
        <div className='profile-header'>
          <NavLink className='chiqish' onClick={handleLogout} to='/'>
            <ion-icon name='arrow-back-circle-outline'></ion-icon>
            <span>{translations.profile.exit}</span>
          </NavLink>
          <span>{translations.profile.span1}</span>
          <div className='img' onClick={handleImageClick}>
            <img src={currentUser.image} alt='Profile' />
            <input
              type='file'
              id='imageInput'
              hidden
              onChange={handleImageChange}
            />
          </div>
        </div>
        <div className='profile-info'>
          <h3 className='profile-name'>{currentUser.username}</h3>

          <button className='profile-edit' onClick={toggleEditButtons}>
            {translations.profile.profileEdit}
            <ion-icon name='cog-outline'></ion-icon>
          </button>
          {showEditButtons && (
            <div className='edit-btns'>
              <button className='edit-name' onClick={handleEditNameClick}>
                <ion-icon name='create-outline'></ion-icon>
                {translations.profile.editName}
              </button>
              {isEditPopupVisible && (
                <EditUsernamePopup
                  currentUsername={currentUser.username}
                  onClose={handleClosePopup}
                  onSubmit={handleUsernameSubmit}
                />
              )}
              <button
                className='edit-password'
                onClick={handleEditPasswordClick}
              >
                <ion-icon name='create-outline'></ion-icon>
                {translations.profile.editPassword}
              </button>
              {isEditPasswordPopupVisible && (
                <EditPasswordPopup
                  onClose={handleClosePasswordPopup}
                  onSubmit={handlePasswordSubmit}
                />
              )}
            </div>
          )}
        </div>

        <div className='profile-container'>
          <div className='profile-filter'>
            <button className='profile-offer__btn active'>
              {translations.profile.profileOffer}
            </button>
            <button className='profile-history__btn'>
              {translations.profile.profileHistory}
            </button>
          </div>

          <div className='data-container'>
            {offers.length == 0 ? (
              <div className='no-offers'>
                <p>{translations.profile.no_active_orders}.</p>
                <Link to='/offer' className='create-offer-profile'>
                  <h3>{translations.profile.create_new}!</h3>
                </Link>
              </div>
            ) : (
              offers.map((offerData) => (
                <div className='data-content' key={offerData.id}>
                  <div className='content-box'>
                    <div className='content-img'>
                      <img src={currentUser.image} alt={offerData.name} />
                    </div>
                    <div className='content-info'>
                      <p className='content-level'>
                        {translations.profile.level}:{' '}
                        <span>{offerData.level}</span>
                      </p>
                      <p className='content-price'>
                        {translations.profile.price}:{' '}
                        <span>{offerData.cost}</span> so'm
                      </p>
                    </div>
                  </div>
                  <div className='content-info__edit'>
                    <button
                      className='delete-info__btn'
                      onClick={() => handleDeleteClick(offerData.id)}
                    >
                      <ion-icon name='trash-outline'></ion-icon>
                    </button>
                    <button
                      className='update-info__btn'
                      onClick={() => handleEditOfferClick(offerData)}
                    >
                      {translations.profile.updateInfo}
                    </button>
                  </div>
                </div>
              ))
            )}
            <ConfirmationPopup
              isOpen={isConfirmPopupOpen}
              onClose={handleDeleteCancel}
              onConfirm={handleDeleteConfirm}
            />
            {isEditOfferPopupVisible && selectedOffer && (
              <EditOffer
                isOpen={isEditOfferPopupVisible}
                onClose={handleCloseEditOfferPopup}
                offerInfo={selectedOffer}
              />
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
