// src/pages/About.js
import React from 'react';
import '../styles/About.css'; // Import the CSS file for styling

const About = () => {
  return (
    <div className="about-container">
      <h2 className="about-header">Avira's Bridal Collection</h2>
      <div className="detail-row">
        <span className="icon">🏠</span>
        <span className="text">5/220, behind Karur Vysya Bank, Mettukadai, Erode, Tamil Nadu 638107</span>
      </div>
      <div className="detail-row">
        <span className="icon">📍</span>
        <span className="text">Erode, Tamil Nadu, India</span>
      </div>
      <div className="detail-row">
        <span className="icon">📞</span>
        <span className="text">097156 77872</span>
      </div>
      <div className="detail-row">
        <span className="icon">✉️</span>
        <span className="text email"><a href="mailto:jananicse1@gmail.com">jananicse1@gmail.com</a></span>
      </div>
      <div className="detail-row">
        <span className="icon">📷</span>
        <span className="text instagram">
          <a href="https://www.instagram.com/aviras_bridal_collections" target="_blank" rel="noopener noreferrer">
            @aviras_bridal_collections
          </a>
        </span>
      </div>
      <div className="basic-info">
        <span>Not yet rated (0 reviews)</span>
      </div>
    </div>
  );
};

export default About;
