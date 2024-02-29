import React from 'react';
import './prePayment.css';
import { NavLink, Link } from 'react-router-dom';
import { buyOffer } from '../../../slices/offerSlice';
import payme_logo from '../../../img/payme_02.png';
import { useDispatch, useSelector } from 'react-redux';
import { selectCurrentUser } from '../../../slices/authSlice';

const PrePayment = ({ closePrePayment, game }) => {
  const dispatch = useDispatch();
  const merchant_id = '65c4bcd3de9e0abfa2a61880';
  const savedLang = localStorage.getItem('languagePreference');
  const currentUser = useSelector(selectCurrentUser);

  const buyOfferForChatTest = () => {
    dispatch(buyOffer(game.id));
    console.log(game.id);
  };

  return (
    <div className='modal-overlay'>
      <div className='modal-content'>
        <div className='modal-header'>
          <h2>Получение</h2>
          <button onClick={closePrePayment} className='modal-close-button'>
            &times;
          </button>
        </div>
        <hr />
        <div className='modal-body'>
          <p className='important-info'>
            Siz to'lovni bizga "CyberSwap" ga amalga oshirasiz va faqat sotuvchi
            sizga accountni to'liq o'tkazib bergandan so'ng bizdan pulni qabul
            qilib oladi
          </p>
          <h2>Вы получите после оплаты</h2>
          <div className='modal-item'>
            <ion-icon name='bulb-outline'></ion-icon>
            <h4>Инструкция после покупки</h4>
          </div>
          <div className='modal-item'>
            <ion-icon name='chatbubbles-outline'></ion-icon>
            <h4>Будет доступен чат с продавцом</h4>
          </div>
          <div className='modal-item'>
            <ion-icon name='cash-outline'></ion-icon>
            <h4>Pulni qaytarib olish</h4>
          </div>
        </div>
        <hr />
        <h4 className='choose-payment'>
          Quyidagi to'lov usullaridan birini tanlang
          <ion-icon name='arrow-down-outline'></ion-icon>
        </h4>
        <br />
        <br />
        <Link to='/chat' onClick={buyOfferForChatTest}>
          <h5>testing chat</h5>
        </Link>

        <br />
        <br />
        <form
          method='POST'
          action='https://checkout.paycom.uz'
          className='modal-pay-form'
        >
          <input type='hidden' name='merchant' value={merchant_id} />
          <input type='hidden' name='amount' value={game.cost * 100} />
          <input type='hidden' name='account[offer_id]' value={game.id} />
          <input type='hidden' name='account[user_id]' value={currentUser.id} />
          <input
            type='hidden'
            name='callback'
            value={`https://cyberswap.uz/${game.id}`}
          />
          <input type='hidden' name='callback_timeout' value={2000} />
          <button type='submit' className='modal-pay-logo'>
            <img src={payme_logo} alt='payment logo' />
            <span>
              Pay with <b>Payme</b>
            </span>
          </button>
        </form>
      </div>
    </div>
  );
};

export default PrePayment;
