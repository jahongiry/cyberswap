import React, { useState, useEffect } from 'react';
import './offer.css';
import { selectTranslations } from '../../slices/languageSlice';
import defaultImage from '../../img/pubg.jpeg';
import { createPubgAccountOffer } from '../../slices/offerSlice';
import { useSelector, useDispatch } from 'react-redux';
import { json } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import Loader from '../../component/loader/Loader2';
import { toast } from 'react-toastify';

const Offer = () => {
  const translations = useSelector(selectTranslations);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [images, setImages] = useState([]);
  const [imagePreviews, setImagePreviews] = useState([]);
  const [royal_pass, setRoyal_pass] = useState([]);
  const [currentRoyalPass, setCurrentRoyalPass] = useState('');
  const [skins, setSkins] = useState([]);
  const [currentSkin, setCurrentSkin] = useState('');
  const [level, setLevel] = useState('');
  const [rating, setRating] = useState('');
  const [cost, setCost] = useState('');
  const [description, setDescription] = useState('');
  const [loading, setLoading] = useState(false);
  const [isConnectRequired, setIsConnectRequired] = useState(false);
  const [isImageRequired, setIsImageRequired] = useState(false);
  const [connects, setConnects] = useState({
    phone_number: false,
    email: false,
    apple_id: false,
    facebook: false,
    twitter: false,
    game_center: false,
  });

  const handleAddSkin = () => {
    if (currentSkin.trim() !== '' && !skins.includes(currentSkin.trim())) {
      setSkins([...skins, currentSkin.trim()]);
      setCurrentSkin('');
    }
  };

  const handleRemoveSkin = (skinToRemove) => {
    setSkins(skins.filter((skin) => skin !== skinToRemove));
  };

  const handleAddRoyalPass = () => {
    if (
      currentRoyalPass.trim() !== '' &&
      !royal_pass.includes(currentRoyalPass.trim())
    ) {
      setRoyal_pass([...royal_pass, currentRoyalPass.trim()]);
      setCurrentRoyalPass('');
    }
  };

  const handleRemoveRoyalPass = (passToRemove) => {
    setRoyal_pass(royal_pass.filter((pass) => pass !== passToRemove));
  };

  const handleImageChange = (e) => {
    if (e.target.files && e.target.files.length > 0) {
      const newImages = Array.from(e.target.files);
      setImages((prevImages) => [...prevImages, ...newImages]);

      const newImagePreviews = newImages.map((file) =>
        URL.createObjectURL(file)
      );
      setImagePreviews((prevPreviews) => [
        ...prevPreviews,
        ...newImagePreviews,
      ]);
    }
  };

  const removeImage = (index) => {
    setImagePreviews((prevImages) => prevImages.filter((_, i) => i !== index));
    setImages((prevImages) => prevImages.filter((_, i) => i !== index));
  };

  const handleConnectChange = (connectType) => {
    setConnects((prevConnects) => ({
      ...prevConnects,
      [connectType]: !prevConnects[connectType],
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    const isAnyConnectSelected = Object.values(connects).some((value) => value);
    if (!isAnyConnectSelected) {
      setIsConnectRequired(true);
      setLoading(false);
      return;
    }
    setIsConnectRequired(false);

    const offerData = {
      data: {
        level: parseInt(level, 10),
        rating: parseInt(rating, 10),
        royal_pass,
        skins,
        cost: parseInt(cost, 10),
        description,
        connects,
      },
      images,
    };

    try {
      await dispatch(createPubgAccountOffer(offerData)).unwrap();
      navigate('/profile');
    } catch (error) {
      toast.error(<p className='red-text-important'>"Error while creating"</p>);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const isAnyConnectSelected = Object.values(connects).some((value) => value);
    if (isAnyConnectSelected) {
      setIsConnectRequired(false);
    }
  }, [connects]);

  if (loading) {
    return <Loader />;
  }

  return (
    <section className='offer container'>
      <div className='offer-container'>
        <h1>{translations.offer.title}</h1>
        <p>{translations.offer.subtitle}</p>

        <form onSubmit={handleSubmit}>
          <div className='image-upload-container'>
            {imagePreviews.map((image, index) => (
              <div key={index} className='image-preview'>
                <img src={image} alt={`upload-preview-${index}`} />
                <button onClick={() => removeImage(index)}>X</button>
              </div>
            ))}
            {imagePreviews.length < 5 && (
              <label className='image-uploader'>
                <input
                  type='file'
                  onChange={handleImageChange}
                  multiple
                  accept='image/*'
                  style={{ display: 'none' }}
                  required
                />
                <div className='plus-sign'>+</div>
              </label>
            )}
          </div>
          <div className='form-group'>
            <div className='form-input'>
              <label htmlFor='level'>{translations.offer.level}</label>
              <input
                type='number'
                name='level'
                value={level}
                onChange={(e) => setLevel(e.target.value)}
                id='level'
                min={0}
                placeholder={translations.offer.levelPlaceholder}
                required
              />
            </div>
            <div className='form-input'>
              <label htmlFor='achievement'>{translations.offer.achiv}</label>
              <input
                type='text'
                name='achievement'
                id='achievement'
                value={rating}
                onChange={(e) => setRating(e.target.value)}
                placeholder={translations.offer.levelAchiv}
                required
              />
            </div>
          </div>
          <div className='form-group'>
            <div className='form-input'>
              <label htmlFor='royalPass'>{translations.offer.pass}</label>
              <div className='royal-pass-input-container'>
                {royal_pass.map((pass, index) => (
                  <span key={index} className='royal-pass-tag'>
                    {pass}
                    <button
                      type='button'
                      onClick={() => handleRemoveRoyalPass(pass)}
                    >
                      x
                    </button>
                  </span>
                ))}
                <input
                  type='text'
                  id='royalPass'
                  value={currentRoyalPass}
                  onChange={(e) => setCurrentRoyalPass(e.target.value)}
                  placeholder={
                    royal_pass.length === 0 ? translations.offer.royalPass : ''
                  }
                />
                {currentRoyalPass && (
                  <button
                    type='button'
                    onClick={handleAddRoyalPass}
                    className='add-royal-pass-btn'
                  >
                    Add
                  </button>
                )}
              </div>
            </div>

            <div className='form-input'>
              <label htmlFor='skin'>{translations.offer.skins}</label>
              <div className='skin-input-container'>
                {skins.map((skin, index) => (
                  <span key={index} className='skin-tag'>
                    {skin}
                    <button
                      type='button'
                      onClick={() => handleRemoveSkin(skin)}
                    >
                      x
                    </button>
                  </span>
                ))}
                <input
                  type='text'
                  id='skin'
                  value={currentSkin}
                  onChange={(e) => setCurrentSkin(e.target.value)}
                  placeholder={
                    skins.length === 0 ? translations.offer.skinsEnter : ''
                  }
                />
                {currentSkin && (
                  <button
                    type='button'
                    onClick={handleAddSkin}
                    className='add-skin-btn'
                  >
                    Add
                  </button>
                )}
              </div>
            </div>
          </div>
          <div className='form-input'>
            <span>{translations.offer.connect}</span>
            <div className='connect-input'>
              <label htmlFor='phone'>
                <input
                  type='checkbox'
                  id='phone'
                  checked={connects.phone_number}
                  onChange={() => handleConnectChange('phone_number')}
                />
                <i className='fa-solid fa-phone'></i>
              </label>

              <label htmlFor='email'>
                <input
                  type='checkbox'
                  id='email'
                  checked={connects.email}
                  onChange={() => handleConnectChange('email')}
                />
                <i className='fa-solid fa-envelope'></i>{' '}
              </label>

              <label htmlFor='apple'>
                <input
                  type='checkbox'
                  id='apple'
                  checked={connects.apple_id}
                  onChange={() => handleConnectChange('apple_id')}
                />
                <i className='fa-brands fa-apple'></i>
              </label>

              <label htmlFor='facebook'>
                <input
                  type='checkbox'
                  id='facebook'
                  checked={connects.facebook}
                  onChange={() => handleConnectChange('facebook')}
                />
                <i className='fa-brands fa-facebook-f'></i>
              </label>

              <label htmlFor='twitter'>
                <input
                  type='checkbox'
                  id='twitter'
                  checked={connects.twitter}
                  onChange={() => handleConnectChange('twitter')}
                />
                <i className='fa-brands fa-twitter'></i>
              </label>

              <label htmlFor='gamecenter'>
                <input
                  type='checkbox'
                  id='gamecenter'
                  checked={connects.game_center}
                  onChange={() => handleConnectChange('game_center')}
                />
                <i className='fa-solid fa-gamepad'></i>
              </label>
            </div>
          </div>
          {isConnectRequired && (
            <p className='error-message'>
              {translations.offer.connectRequiredMessage}
            </p>
          )}
          <div className='form-input'>
            <label htmlFor='cost'>{translations.offer.price}</label>
            <input
              type='number'
              name='cost'
              id='cost'
              value={cost}
              onChange={(e) => setCost(e.target.value)}
              min={0}
              placeholder={translations.offer.pricePlaceholder}
              required
            />
          </div>
          <div className='form-input'>
            <label htmlFor='description'>{translations.offer.message}:</label>
            <textarea
              name='description'
              id='description'
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder={translations.offer.messagePlaceholder}
              required
            ></textarea>
          </div>
          <button className='form-btn' type='submit'>
            {translations.offer.create}
          </button>
        </form>
      </div>
    </section>
  );
};

export default Offer;
