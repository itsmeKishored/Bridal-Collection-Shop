import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import '../styles/ShippingDetails.css';

const ShippingDetails = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { cartItems } = location.state; // Retrieve cart items from state

  const [shippingInfo, setShippingInfo] = useState({
    name: '',
    address: '',
    city: '',
    zip: '',
    country: '',
    phone: '',  // Add phone field
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setShippingInfo({ ...shippingInfo, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Navigate to the payment page with shipping info and cart items
    navigate('/payment', { state: { shippingInfo, cartItems } });
  };

  return (
    <div className="shipping-details">
      <h1>Shipping Details</h1>
      <form onSubmit={handleSubmit}>
        <input type="text" name="name" placeholder="Full Name" onChange={handleChange} required />
        <input type="text" name="address" placeholder="Address" onChange={handleChange} required />
        <input type="text" name="city" placeholder="City" onChange={handleChange} required />
        <input type="text" name="zip" placeholder="Zip Code" onChange={handleChange} required />
        <input type="text" name="country" placeholder="Country" onChange={handleChange} required />
        <input type="text" name="phone" placeholder="Phone Number" onChange={handleChange} required />  {/* Add phone number input */}
        <button type="submit">Proceed to Payment</button>
      </form>
    </div>
  );
};

export default ShippingDetails;
