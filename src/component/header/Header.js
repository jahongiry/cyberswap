import React from "react";
import { NavLink, Link } from "react-router-dom";

import "./header.css";

import logo from "./logo1_1.png";

const Header = () => {
  return (
    <header className="container header">
      <Link to="/">
        <div className="logo">
          <img src={logo} alt="Cyberswap" />
        </div>
        <span>Cyberswap</span>
      </Link>

      <nav>
        <ul>
          <li>
            <NavLink activeclassname="active" to="/">
              Home
            </NavLink>
          </li>
          <li>
            <NavLink to="/about">About</NavLink>
          </li>
          <li>
            <NavLink to="/contact">Contact</NavLink>
          </li>
        </ul>
      </nav>

      <Link to="/basket" className="basket">
        <i class="fa-solid fa-cart-shopping"></i>
      </Link>

      <Link className="nav-btn">
        <i class="fa-solid fa-bars"></i>
      </Link>
    </header>
  );
};

export default Header;
