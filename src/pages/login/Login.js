import React from "react";
import "./login.css";
import logo1 from "../../component/header/logo1_1.png";
import { NavLink, Link } from "react-router-dom";

const Login = () => {
  return (
    <div className="login-section">
      <div className="login-container">
        <div className="login-border">
          <div className="line">
            <div className="corner-item top-left"></div>
            <hr />
            <hr />
            <div className="corner-item top-right"></div>
          </div>
          <img className="logo-in" src={logo1} alt="logo" />
          <h2>Hush kelibsiz</h2>
          <form className="login-form">
            <div className="input-container">
              <label htmlFor="username">Telefon nomer</label>
              <input type="text" id="username" placeholder="+998912345678" />
            </div>
            <div className="input-container">
              <label htmlFor="password">Parolingiz</label>
              <input type="password" id="password" placeholder="Password" />
            </div>
            <div className="login-footer">
              <div>
                <label htmlFor="button">Parol esdan chiqdi</label>
                <button type="button" className="signup-button">
                  Parol tiklash
                </button>
              </div>
              <hr class="vertical-hr" />
              <div>
                <hr className="horizontal-hr" />
                <NavLink to="/signup">
                  <button type="submit" className="login-button royhat-login">
                    Royhatdan o'tish
                  </button>
                </NavLink>
              </div>
            </div>
            <button type="submit" className="login-main">
              Kirish
            </button>
            <div className="back-home">
              <hr />
              <NavLink activeclassname="forgot-password" to="/">
                ASOSIYGA QAYTISH
              </NavLink>
              <hr />
            </div>
            <hr className="bottom-line" />
          </form>
          <div className="corner-item bottom-left"></div>
          <div className="corner-item bottom-right"></div>
        </div>
      </div>
    </div>
  );
};

export default Login;
