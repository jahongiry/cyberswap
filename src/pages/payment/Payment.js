import React from "react";
import "./payment.css";

const Payment = () => {
  return (
    <div className="payment container">
      <div className="payment-container">
        <h1>To'lov ma'lumotlari</h1>

        <div className="payment-content">
          <p>
            To'lov qilganizdan so'ng pul bizning hisob raqamda turadi, faqat
            akkountni olganingizdan so'ng sotuvchiga o'tkaziladi.
          </p>
          <div className="line-right line"></div>
          <p>Click evalution</p>
          <div className="line-left line"></div>
          <div className="payment-type">
            <div className="click">
              <p>Click telefon</p>
              <input type="tel" placeholder="998*******" />
            </div>
            
            <div className="plastic-card">
              <p>Karta raqami</p>
              <input type="number" placeholder="**** **** **** ****" />
              <input type="numbetr" placeholder="08-26" />
            </div>
            
            <div className="line"></div>
          </div>
          <p className="total-price">
            Jami summa: <span>1500</span> $
          </p>
        </div>
        <button className="payment-btn">To'lash</button>
      </div>
    </div>
  );
};

export default Payment;
