import React from "react";
import { Link } from "react-router-dom";
import "./footer.css";
import logo from "./img/logo1_1.png";
import twitchImg from "./img/twitch.png";
import robloxImg from "./img/roblax.png";
import asusImg from "./img/asus.png";
import canonImg from "./img/canon.png";
import microsoftImg from "./img/microsoft.png";

const Footer = () => {
  return (
    <footer className="container footer">
      {/* footer-container start */}
      <div className="footer-container">
        <div className="footer-content footer-logo">
          <Link to="/">
            <div className="logo">
              <img src={logo} alt="Cyberswap logo" />
            </div>
            <span>Cyberswap</span>
          </Link>

          <p>
            A well-designed gaming header often incorporates elements such as
            game characters, iconic symbols, vibrant colors, and dynamic visuals
            .
          </p>
        </div>

        <div className="footer-content company">
          <h3>company</h3>

          <ul>
            <li>
              <Link>products</Link>
            </li>
            <li>
              <Link>apps & games</Link>
            </li>
            <li>
              <Link>features</Link>
            </li>
          </ul>
        </div>

        <div className="footer-content help">
          <h3>help</h3>

          <ul>
            <li>
              <Link>support</Link>
            </li>
            <li>
              <Link>about</Link>
            </li>
            <li>
              <Link>contact us</Link>
            </li>
          </ul>
        </div>

        <div className="footer-content resource">
          <h3>resources</h3>

          <ul>
            <li>
              <Link>youtube playlist</Link>
            </li>
            <li>
              <Link>how to - blog</Link>
            </li>
            <li>
              <Link>terms & conditions</Link>
            </li>
          </ul>
        </div>
      </div>
      {/* footer-container start */}

      {/* footer-partner start */}
      <div className="footer-partner">
        <div className="img">
          <img src={twitchImg} alt="twitch" />
        </div>
        <div className="img">
          <img src={robloxImg} alt="roblox" />
        </div>
        <div className="img">
          <img src={asusImg} alt="asus" />
        </div>
        <div className="img">
          <img src={canonImg} alt="canon" />
        </div>
        <div className="img">
          <img src={microsoftImg} alt="microsoft" />
        </div>
      </div>
      {/* footer-partner start */}

      {/* footer-copyright start */}
      <div className="footer-copyright">

        <div className="footer-social__network">
          <Link to="#" className="icon twitter">
            <i className="fa-brands fa-twitter"></i>
          </Link>
          <Link to="#" className="icon facebook">
            <i className="fa-brands fa-facebook-f"></i>
          </Link>
          <Link to="#" className="icon instagram">
            <i className="fa-brands fa-instagram"></i>
          </Link>
          <Link to="#" className="icon github">
            <i className="fa-brands fa-github"></i>
          </Link>
        </div>

        <p>&copy; Copyright 2024, All Rights Reserved by oddiy inson</p>

      </div>
      {/* footer-copyright end */}

    </footer>
  );
};

export default Footer;
