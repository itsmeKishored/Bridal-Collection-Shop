import React, { useState, useEffect } from 'react';
import '../styles/About.css'; // Import the CSS file for styling
import axios from 'axios';

const About = () => {
  const [feedback, setFeedback] = useState('');
  const [name, setName] = useState('');
  const [feedbacks, setFeedbacks] = useState([]);

  // Fetch feedbacks from the server
  useEffect(() => {
    axios.get('http://localhost:3001/feedback')
      .then(response => setFeedbacks(response.data))
      .catch(error => console.error('Error fetching feedbacks:', error));
  }, []);

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    axios.post('http://localhost:3001/feedback', { name, feedback })
      .then(response => {
        setFeedbacks([...feedbacks, response.data]);
        setName('');
        setFeedback('');
      })
      .catch(error => console.error('Error submitting feedback:', error));
  };

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

      <h3 className="feedback-header">Submit your feedback</h3>
      <form onSubmit={handleSubmit} className="feedback-form">
        <input
          type="text"
          placeholder="Your Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />
        <textarea
          placeholder="Your Feedback"
          value={feedback}
          onChange={(e) => setFeedback(e.target.value)}
          required
        ></textarea>
        <button type="submit">Submit Feedback</button>
      </form>

      <h3 className="feedback-header">User Feedback</h3>
      <div className="feedback-list">
        {feedbacks.map((fb, index) => (
          <div key={index} className="feedback-item">
            <h4>{fb.name}</h4>
            <p>{fb.feedback}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default About;
