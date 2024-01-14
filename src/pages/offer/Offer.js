import React from 'react';
import './offer.css';

const Offer = () => {
  return (
    <section className='offer container'>
      <div className='offer-container'>
        <h1>E'lon yaratish</h1>
        <p>E'lon yaratish mutlaqo bepul!</p>

        <form action='#'>
          <div className='form-group'>
            <div className='form-input'>
              <label htmlFor='level'>Daraja</label>
              <input type='number' name='level' id='level' min={0} />
            </div>
            <div className='form-input'>
              <label htmlFor='royalPass'>Royal pass</label>
              <input type='text' name='royalPass' id='royalPass' />
            </div>
          </div>

          <div className='form-group'>
            <div className='form-input'>
              <label htmlFor='skin'>Skins</label>
              <input type='text' name='skin' id='skin' />
            </div>
            <div className='form-input'>
              <label htmlFor='achievement'>Achievement</label>
              <input type='text' name='achievement' id='achievement' />
            </div>
          </div>

          <div className='form-input'>
            <span>Ulangan</span>
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
            <label htmlFor='cost'>Narxi</label>
            <input type='number' name='cost' id='cost' min={0} />
          </div>
          <div className='form-input'>
            <label htmlFor='message'>Message:</label>
            <textarea name='message' id='message'></textarea>
          </div>

          <button className='form-btn' type='button'>
            Yaratish
          </button>
        </form>
      </div>
    </section>
  );
};

export default Offer;
