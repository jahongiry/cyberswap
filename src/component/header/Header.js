import React, {useState} from "react";
import { NavLink, Link } from "react-router-dom";

import "./header.css";

import logo from "./logo1_1.png";

const Header = () => {


  const [navbar, setNavbar] = useState(false);
  const navBtn = () => setNavbar(!navbar);
  return (
    <header className="container header">
      <Link to="/">
        <div className="logo">
          <img src={logo} alt="Cyberswap" />
        </div>
        <span>Cyberswap</span>
      </Link>

      <nav className={navbar ? "mobile" : ""}>
        <ul>
          <li onClick={navBtn}>
            <NavLink activeclassname="active" to="/">
              Home
            </NavLink>
          </li>
          <li onClick={navBtn}>
            <NavLink to="/about">About</NavLink>
          </li>
          <li onClick={navBtn}>
            <NavLink to="/contact">Contact</NavLink>
          </li>
        </ul>
      </nav>

      <div className="header-btns">
        <Link to="/basket" className="basket">
          <i className="fa-solid fa-cart-shopping"></i>
        </Link>

        <Link className="nav-btn" onClick={navBtn}>
          <i className={navbar ? "fa-solid fa-times" : "fa-solid fa-bars"}></i>
        </Link>
      </div>
    </header>
  );
};

export default Header;
