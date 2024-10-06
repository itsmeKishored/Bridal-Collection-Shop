// src/components/Header.js
import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import '../styles/Header.css'; // Ensure you have this CSS file
import cartIcon from '../assets/cart-icon.png'; // Add cart icon image to your assets folder
import logo from '../assets/logo.jpg'; // Add logo image to your assets folder

const Header = () => {
  const navigate = useNavigate();

  const goToCart = () => {
    navigate('/cart'); // Navigate to the cart page
  };

  return (
    <header>
      <div className="header-container">
        <img src={logo} alt="Avira's Bridal Collection Logo" className="logo" />
        <h1>Avira's Bridal Collection</h1>
        <nav>
          <ul className="nav-links">
            <li><Link to="/home">Home</Link></li>
            <li><Link to="/services">Services</Link></li>
            <li><Link to="/appointment">Appointment</Link></li>
            <li><Link to="/about">About</Link></li>
            <li><Link to="/location">Location</Link></li>
            <li><Link to="/jewels">Jewelry</Link></li>
            <li>
              <img 
                src={cartIcon} 
                alt="Cart" 
                className="cart-icon" 
                onClick={goToCart} // Click handler to navigate to cart page
              />
              Cart
            </li>
          </ul>
        </nav>
      </div>
    </header>
  );
};

export default Header;
