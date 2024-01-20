import React, { useState } from 'react';
import './offer.css';
import { selectTranslations } from '../../slices/languageSlice';
import { useSelector } from 'react-redux';
import sampleImage from '../../img/pubg_page.png';

const Offer = () => {
  const translations = useSelector(selectTranslations);
  const [images, setImages] = useState([]);
  const [imagePreviews, setImagePreviews] = useState([]);
  const [royalPasses, setRoyalPasses] = useState([]);
  const [currentRoyalPass, setCurrentRoyalPass] = useState('');
  const [skins, setSkins] = useState([]);
  const [currentSkin, setCurrentSkin] = useState('');

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
      !royalPasses.includes(currentRoyalPass.trim())
    ) {
      setRoyalPasses([...royalPasses, currentRoyalPass.trim()]);
      setCurrentRoyalPass('');
    }
  };

  const handleRemoveRoyalPass = (passToRemove) => {
    setRoyalPasses(royalPasses.filter((pass) => pass !== passToRemove));
  };

  const handleImageChange = (e) => {
    if (e.target.files) {
      const filesArray = Array.from(e.target.files).map((file) =>
        URL.createObjectURL(file)
      );

      setImagePreviews((prevImages) => prevImages.concat(filesArray));
      setImages((prevImages) => prevImages.concat(Array.from(e.target.files)));
      e.target.value = null;
    }
  };

  const removeImage = (index) => {
    setImagePreviews((prevImages) => prevImages.filter((_, i) => i !== index));
    setImages((prevImages) => prevImages.filter((_, i) => i !== index));
  };

  return (
    <section className='offer container'>
      <div className='offer-container'>
        <h1>{translations.offer.title}</h1>
        <p>{translations.offer.subtitle}</p>

        <form action='#'>
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
                id='level'
                min={0}
                placeholder={translations.offer.levelPlaceholder}
              />
            </div>
            <div className='form-input'>
              <label htmlFor='achievement'>{translations.offer.achiv}</label>
              <input
                type='text'
                name='achievement'
                id='achievement'
                placeholder={translations.offer.levelAchiv}
              />
            </div>
          </div>

          <div className='form-group'>
            <div className='form-input'>
              <label htmlFor='royalPass'>{translations.offer.pass}</label>
              <div className='royal-pass-input-container'>
                {royalPasses.map((pass, index) => (
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
                    royalPasses.length === 0 ? translations.offer.royalPass : ''
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
                <input type='checkbox' name='connected' id='phone' />
                <i className='fa-solid fa-phone'></i>
              </label>
              <label htmlFor='google'>
                <input type='checkbox' name='connected' id='google' />
                <i className='fa-brands fa-google'></i>
              </label>
              <label htmlFor='apple'>
                <input type='checkbox' name='connected' id='apple' />
                <i className='fa-brands fa-apple'></i>
              </label>
              <label htmlFor='facebook'>
                <input type='checkbox' name='connected' id='facebook' />
                <i className='fa-brands fa-facebook-f'></i>
              </label>
              <label htmlFor='gamecenter'>
                <input type='checkbox' name='connected' id='gamecenter' />
                <i className='fa-solid fa-gamepad'></i>
              </label>
            </div>
          </div>
          <div className='form-input'>
            <label htmlFor='cost'>{translations.offer.price}</label>
            <input
              type='number'
              name='cost'
              id='cost'
              min={0}
              placeholder={translations.offer.pricePlaceholder}
            />
          </div>
          <div className='form-input'>
            <label htmlFor='message'>{translations.offer.message}:</label>
            <textarea
              name='message'
              id='message'
              placeholder={translations.offer.messagePlaceholder}
            ></textarea>
          </div>

          <button className='form-btn' type='button'>
            {translations.offer.create}
          </button>
        </form>
      </div>
    </section>
  );
};

export default Offer;
