import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { loadStripe } from '@stripe/stripe-js';
import '../styles/cart.css';

const stripePromise = loadStripe('pk_test_51PcJUpRvfkQEybb0CiK0hqRwWAFFk8x7OHSD5uXhnZA0FCsm0UVZbzrQEn8GVeK8aXHjsuwaIPntTMKLhH1ok7Ko00sVzy14EP'); 

const Cart = () => {
  const [cartItems, setCartItems] = useState([]);
  const navigate = useNavigate();

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

  // Handle increasing item quantity
  const handleIncreaseQuantity = (itemName) => {
    const updatedItems = cartItems.map(item => {
      if (item.itemName === itemName) {
        return { ...item, quantity: item.quantity + 1 };
      }
      return item;
    });
    setCartItems(updatedItems);
  };

  // Handle decreasing item quantity
  const handleDecreaseQuantity = (itemName) => {
    const updatedItems = cartItems.map(item => {
      if (item.itemName === itemName && item.quantity > 1) {
        return { ...item, quantity: item.quantity - 1 };
      }
      return item;
    });
    setCartItems(updatedItems);
  };

  // Handle removing an item from the cart
  const handleRemoveItem = (itemName) => {
    axios.delete(`http://localhost:3001/cart/${itemName}`)
      .then(response => {
        setCartItems(response.data);
      })
      .catch(error => {
        console.error('Error removing item from cart:', error);
      });
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
            <div className="quantity-control">
              <button onClick={() => handleDecreaseQuantity(item.itemName)} className="quantity-button">-</button>
              <p>{item.quantity}</p>
              <button onClick={() => handleIncreaseQuantity(item.itemName)} className="quantity-button">+</button>
            </div>
            <button onClick={() => handleRemoveItem(item.itemName)} className="remove-button">Remove</button>
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
