import React from 'react';
import './offer.css';
import { selectTranslations } from '../../slices/languageSlice';
import { useSelector } from 'react-redux';

const Offer = () => {
  const translations = useSelector(selectTranslations);
  return (
    <section className='offer container'>
      <div className='offer-container'>
        <h1>{translations.offer.title}</h1>
        <p>{translations.offer.subtitle}</p>

        <form action='#'>
          <div className='form-group'>
            <div className='form-input'>
              <label htmlFor='level'>{translations.offer.level}</label>
              <input type='number' name='level' id='level' min={0} />
            </div>
            <div className='form-input'>
              <label htmlFor='royalPass'>{translations.offer.pass}</label>
              <input type='text' name='royalPass' id='royalPass' />
            </div>
          </div>

          <div className='form-group'>
            <div className='form-input'>
              <label htmlFor='skin'>{translations.offer.skins}</label>
              <input type='text' name='skin' id='skin' />
            </div>
            <div className='form-input'>
              <label htmlFor='achievement'>{translations.offer.achiv}</label>
              <input type='text' name='achievement' id='achievement' />
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
            <input type='number' name='cost' id='cost' min={0} />
          </div>
          <div className='form-input'>
            <label htmlFor='message'>{translations.offer.message}:</label>
            <textarea name='message' id='message'></textarea>
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
