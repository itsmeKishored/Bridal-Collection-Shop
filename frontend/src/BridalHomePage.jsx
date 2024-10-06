import React from 'react';
import { Link } from 'react-router-dom';
import { useSpring, animated } from 'react-spring';
import './BridalHomePage.css';
import dress1 from './assets/dress1.jpeg';
import dress2 from './assets/dress1.jpeg';
import dress3 from './assets/dress1.jpeg';

function BridalHomePage() {
    const fadeIn = useSpring({ opacity: 1, from: { opacity: 0 }, delay: 200 });
    const slideInHeader = useSpring({ transform: 'translateY(0)', from: { transform: 'translateY(-40px)' }, delay: 400 });
    const slideInContent = useSpring({ transform: 'translateY(0)', from: { transform: 'translateY(40px)' }, delay: 600 });

    return (
        <animated.div style={fadeIn} className="bridal-home-container">
            <animated.div style={slideInHeader} className="bridal-home-header">
                <h1>Welcome to Avira's Bridal Collection</h1>
                <p>Where Elegance Meets the Perfect Day</p>
            </animated.div>
            <animated.div style={slideInContent} className="bridal-home-content">
                <div className="bridal-home-details">
                    <p>
                        At Avira’s Bridal Collection, we believe every bride deserves to shine. Our carefully curated collection offers breathtaking bridal gowns, veils, and accessories that will make your special day unforgettable.
                    </p>
                    <p>
                        Browse through our exclusive designs, register for personalized fittings, or log in to view your saved styles and appointments.
                    </p>
                </div>
                <div className="bridal-home-buttons">
                    <Link to="/register" className="bridal-btn bridal-btn-register">Book a Fitting</Link>
                    <Link to="/login" className="bridal-btn bridal-btn-login">Login</Link>
                </div>
            </animated.div>
            <div className="bridal-home-images">
                <img src={dress1} alt="Bridal Dress 1" className="bridal-home-img" />
                <img src={dress2} alt="Bridal Dress 2" className="bridal-home-img" />
                <img src={dress3} alt="Bridal Dress 3" className="bridal-home-img" />
            </div>
        </animated.div>
    );
}

export default BridalHomePage;
