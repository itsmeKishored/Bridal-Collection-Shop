import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import axios from 'axios';
import '../styles/Payment.css';

const Payment = () => {
  const location = useLocation();
  const { shippingInfo, cartItems } = location.state;
  const navigate = useNavigate();
  const [accountNumber, setAccountNumber] = useState('');
  const [cvc, setCvc] = useState('');
  const [expiryDate, setExpiryDate] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [showPopup, setShowPopup] = useState(false);

  const handleOrder = async () => {
    const accountNumberRegex = /^\d{16}$/;
    const cvcRegex = /^\d{3}$/;
    const expiryDateRegex = /^(0[1-9]|1[0-2])\/\d{2}$/;

    if (!accountNumberRegex.test(accountNumber)) {
      setErrorMessage('Invalid account number. It should be 16 digits.');
      return;
    }

    if (!cvcRegex.test(cvc)) {
      setErrorMessage('Invalid CVC. It should be 3 digits.');
      return;
    }

    if (!expiryDateRegex.test(expiryDate)) {
      setErrorMessage('Invalid expiry date. Use MM/YY format.');
      return;
    }

    try {
      const paymentDetails = { accountNumber, cvc, expiryDate };

      const response = await axios.post('http://localhost:3001/orders', {
        cartItems,
        shippingInfo,
        paymentDetails,
      });

      if (response.data) {
        setShowPopup(true); // Show the popup on success
      } else {
        setErrorMessage('Failed to create order.');
      }
    } catch (error) {
      console.error('Error creating order:', error);
      setErrorMessage('Failed to create order.');
    }
  };

  const handlePopupClose = () => {
    setShowPopup(false);
    setAccountNumber('');
    setCvc('');
    setExpiryDate('');
    setErrorMessage('');
    navigate('/home');
  };

  return (
    <div className="payment">
      <h1>Review Your Order</h1>
      <h2>Shipping Details</h2>
      <p>Name: {shippingInfo.name}</p>
      <p>Address: {shippingInfo.address}</p>
      <p>City: {shippingInfo.city}</p>
      <p>Zip: {shippingInfo.zip}</p>
      <p>Country: {shippingInfo.country}</p>
      <p>Phone: {shippingInfo.phone}</p> {/* Display phone number */}

      <h2>Your Order</h2>
      <ul>
        {cartItems.map((item, index) => (
          <li key={index}>
            {item.itemName} - ₹{item.price} (x{item.quantity})
          </li>
        ))}
      </ul>

      <h2>Payment Details</h2>
      <input
        type="text"
        placeholder="Account Number"
        value={accountNumber}
        onChange={(e) => setAccountNumber(e.target.value)}
      />
      <input
        type="text"
        placeholder="CVC"
        value={cvc}
        onChange={(e) => setCvc(e.target.value)}
      />
      <input
        type="text"
        placeholder="Expiry Date (MM/YY)"
        value={expiryDate}
        onChange={(e) => setExpiryDate(e.target.value)}
      />

      {errorMessage && <p style={{ color: 'red' }}>{errorMessage}</p>}

      <button onClick={handleOrder}>Proceed to Pay</button>

      {showPopup && (
        <div className="popup-overlay">
          <div className="popup">
            <h2>Payment Successful!</h2>
            <p>Your order has been placed successfully.</p>
            <button onClick={handlePopupClose}>OK</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Payment;
