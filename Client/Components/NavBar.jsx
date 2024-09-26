import React, { useState } from "react";
import { Link } from "react-router-dom";
import "./Navbar.css"; // Make sure to create and import the CSS file for styling

function NavBar() {
  const [isMobile, setIsMobile] = useState(false);

  return (
    <nav className="navbar">
      <div className="logo-container">
        <img
          src="https://t4.ftcdn.net/jpg/04/40/35/67/360_F_440356706_nyzMtXHg0Rn32WHocy6lHwfraLLLsImV.jpg"
          alt="KiloGram Icon"
          className="logo-icon"
        />
        <h3 className="logo">KiloGram</h3>
      </div>
      <ul
        className={isMobile ? "nav-links-mobile" : "nav-links"}
        onClick={() => setIsMobile(false)} // Close the menu after clicking on a link
      >
        <Link to="/" className="home">
          <li>Home</li>
        </Link>
        <Link to="/about" className="about">
          <li>About</li>
        </Link>
        <Link to="/login" className="login">
          <li>Login</li>
        </Link>
      </ul>
      <button
        className="mobile-menu-icon"
        onClick={() => setIsMobile(!isMobile)} // Toggle mobile menu on click
      >
        {isMobile ? (
          <i className="fas fa-times"></i> // Show 'X' icon when menu is open
        ) : (
          <i className="fas fa-bars"></i> // Show hamburger icon when menu is closed
        )}
      </button>
    </nav>
  );
}

export default NavBar;
