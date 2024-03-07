import React, { useState, useEffect } from 'react';
import './profile.css';
import profileImg from '../../img/halmet.png';
import back_icon from '../../img/icons/back_icon.svg';
import logout_icon from '../../img/icons/logout_2.svg';
import edit_icon from '../../img/icons/edit_icon.svg';
import create_icon from '../../img/icons/create_icon.svg';
import {
  logOutUser,
  selectCurrentUser,
  updatedProfileInfo,
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
import { toast } from 'react-toastify';
import EditUcOffer from './popupOffer/popupOfferUc';

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
  const [imageUploadError, setImageUploadError] = useState('');

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
    dispatch(deleteOffer(selectedOfferId))
      .then((response) => {
        if (response.type.endsWith('fulfilled')) {
          toast.success(
            <p className='green-text-important'>
              {translations.profile.offerDeleteSuccess}
            </p>
          );
          dispatch(fetchOffer());
        } else {
          toast.error(
            <p className='red-text-important'>
              {translations.profile.offerDeleteError}
            </p>
          );
        }
      })
      .catch((error) => {
        toast.error(
          <p className='red-text-important'>
            {translations.profile.offerDeleteError}
          </p>
        );
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
      if (!file.type.startsWith('image/')) {
        setImageUploadError('Only image files are allowed.');
        return;
      }
      setImageUploadError('');

      dispatch(updateProfileImage(file)).then(() => {
        dispatch(updatedProfileInfo());
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
    dispatch(updatePassword({ oldPassword, newPassword }))
      .then((response) => {
        if (response.type.endsWith('fulfilled')) {
          toast.success(
            <p className='green-text-important'>
              {translations.profile.passwordUpdateSuccess}
            </p>
          );
          setIsEditPasswordPopupVisible(false);
        } else {
          toast.error(
            <p className='red-text-important'>
              {translations.profile.passwordUpdateError}
            </p>
          );
        }
      })
      .catch(() => {
        toast.error(translations.profile.passwordUpdateError);
      });
  };

  const handleEditNameClick = () => {
    setIsEditPopupVisible(true);
  };

  const handleClosePopup = () => {
    setIsEditPopupVisible(false);
  };

  const handleUsernameSubmit = (newUsername) => {
    dispatch(updateUsername(newUsername))
      .then((response) => {
        if (response.type.endsWith('fulfilled')) {
          toast.success(
            <p className='green-text-important'>
              {translations.profile.userNameUpdateSuccess}
            </p>
          );
          dispatch(updatedProfileInfo());
          setIsEditPopupVisible(false);
        } else {
          toast.error(translations.profile.usernameUpdateError);
        }
      })
      .catch(() => {
        toast.error(
          <p className='red-text-important'>
            {translations.profile.userNameUpdateError}
          </p>
        );
      });
  };

  const handleLogout = () => {
    dispatch(logOutUser());
  };

  const toggleEditButtons = () => {
    setShowEditButtons(!showEditButtons);
  };

  useEffect(() => {
    dispatch(fetchOffer());
  }, [dispatch]);

  const refreshOffers = () => {
    dispatch(fetchOffer());
  };

  const availableOffers = offers.filter(
    (offer) => offer.status === 'available'
  );

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
          <NavLink className='exit-profile' onClick={handleLogout} to='/'>
            <img src={logout_icon} className='back-icon' alt='back_icon' />
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
            {imageUploadError && (
              <p className='error-message'>{imageUploadError}</p>
            )}
          </div>
        </div>
        <div className='profile-info'>
          <h3 className='profile-name'>{currentUser.username}</h3>

          <button className='profile-edit' onClick={toggleEditButtons}>
            {translations.profile.profileEdit}
            <img src={edit_icon} className='edit-icon' alt='edit_icon' />
          </button>
          {showEditButtons && (
            <div className='edit-btns'>
              <button className='edit-name' onClick={handleEditNameClick}>
                <img
                  src={create_icon}
                  className='create-icon'
                  alt='create_icon'
                />
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
                <img
                  src={create_icon}
                  className='create-icon'
                  alt='create_icon'
                />
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
            <Link to='/chats'>
              <button className='profile-offer__chat'>Chats</button>
            </Link>
          </div>

          <div className='data-container'>
            {availableOffers.length == 0 ? (
              <div className='no-offers'>
                <p>{translations.profile.no_active_orders}.</p>
                <div className='create_new_offer'>
                  <Link to='/pubgaccountoffer' className='create-offer-profile'>
                    <h3>{translations.profile.create_new_account}!</h3>
                  </Link>
                  <Link to='/pubgucoffer' className='create-offer-profile'>
                    <h3>{translations.profile.create_new_uc}!</h3>
                  </Link>
                </div>
              </div>
            ) : (
              availableOffers.map((offerData) => (
                <div className='data-content' key={offerData.id}>
                  <div className='content-box'>
                    <div className='content-img'>
                      <img src={currentUser.image} alt={offerData.name} />
                    </div>
                    <div className='content-info'>
                      {offerData.offer_type === 'pubg_uc' ? (
                        <p className='content-level'>
                          {translations.profile.ucAmount}:{' '}
                          <span>{offerData.quantity}</span>
                        </p>
                      ) : (
                        <p className='content-level'>
                          {translations.profile.level}:{' '}
                          <span>{offerData.level}</span>
                        </p>
                      )}
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
            {isEditOfferPopupVisible &&
              selectedOffer &&
              (selectedOffer.offer_type === 'pubg_uc' ? (
                <EditUcOffer
                  onSuccessfulSubmit={refreshOffers}
                  isOpen={isEditOfferPopupVisible}
                  onClose={handleCloseEditOfferPopup}
                  offerInfo={selectedOffer}
                />
              ) : (
                <EditOffer
                  onSuccessfulSubmit={refreshOffers}
                  isOpen={isEditOfferPopupVisible}
                  onClose={handleCloseEditOfferPopup}
                  offerInfo={selectedOffer}
                />
              ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
