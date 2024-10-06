import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom'; // Import useNavigate
import { loadStripe } from '@stripe/stripe-js';
import '../styles/cart.css';

const stripePromise = loadStripe('pk_test_51PcJUpRvfkQEybb0CiK0hqRwWAFFk8x7OHSD5uXhnZA0FCsm0UVZbzrQEn8GVeK8aXHjsuwaIPntTMKLhH1ok7Ko00sVzy14EP'
); // Replace with your public Stripe API key

const Cart = () => {
  const [cartItems, setCartItems] = useState([]);
  const navigate = useNavigate(); // Initialize useNavigate

  useEffect(() => {
    // Fetch cart items when the component mounts
    axios.get('http://localhost:3001/cart')
      .then(response => {
        setCartItems(response.data);
      })
      .catch(error => {
        console.error('Error fetching cart items:', error);
      });
  }, []);

  // Calculate the total price of the cart items
  const calculateTotalPrice = () => {
    return cartItems.reduce((total, item) => total + (item.price * item.quantity), 0).toFixed(2);
  };

  const handleCheckout = () => {
    // Navigate to the shipping details page
    navigate('/shipping-details', { state: { cartItems } });
  };

  return (
    <div className='cart'>
      <h1>Your Cart</h1>
      <ul>
        {cartItems.map((item, index) => (
          <li key={index} className="cart-item">
            <img src={item.imageUrl} alt={item.itemName} />
            <h3>{item.itemName}</h3>
            <p>Price: ₹{item.price}</p>
            <p>Quantity: {item.quantity}</p>
          </li>
        ))}
      </ul>
      <div className="cart-summary">
        <h2>Total Price: ₹{calculateTotalPrice()}</h2>
        <button onClick={handleCheckout} className="checkout-button">Checkout</button>
      </div>
    </div>
  );
};

export default Cart;
