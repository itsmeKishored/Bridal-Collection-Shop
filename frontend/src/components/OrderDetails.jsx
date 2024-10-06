import React from 'react';
import '../styles/orderDetails.css';

const OrderDetails = ({ order, onClose, onConfirm, handleWhatsAppMessage }) => {
  const handleStatusChange = (newStatus) => {
    onConfirm(newStatus); // Call the confirm handler with the new status
    handleWhatsAppMessage(order.shippingInfo.phone, `Your order with ID: ${order._id} is now ${newStatus}.`);
  };

  return (
    <div className="order-details-modal">
      <div className="modal-content">
        <h3>Order Details</h3>
        <p><strong>Order ID:</strong> {order._id}</p>
        <p><strong>Total Price:</strong> ${order.totalPrice.toFixed(2)}</p>
        <p><strong>Status:</strong> {order.status}</p>

        <h4>Shipping Information:</h4>
        <p><strong>Name:</strong> {order.shippingInfo.name}</p>
        <p><strong>Address:</strong> {order.shippingInfo.address}</p>
        <p><strong>City:</strong> {order.shippingInfo.city}</p>
        <p><strong>Zip:</strong> {order.shippingInfo.zip}</p>
        <p><strong>Country:</strong> {order.shippingInfo.country}</p>
        <p><strong>Phone:</strong> {order.shippingInfo.phone}</p>

        <h4>Items:</h4>
        <ul className="items-list">
          {order.items.map((item, index) => (
            <li key={index}>
              <p><strong>Item:</strong> {item.itemName}</p>
              <p><strong>Price:</strong> ${item.price.toFixed(2)}</p>
              <p><strong>Quantity:</strong> {item.quantity}</p>
              <p><strong>Subtotal:</strong> ${(item.price * item.quantity).toFixed(2)}</p>
            </li>
          ))}
        </ul>

        <div className="button-container">
          <button onClick={() => handleStatusChange('Delivered')}>Mark as Delivered</button>
          <button onClick={() => handleStatusChange('Shipping')}>Mark as Shipping</button>
        </div>
        <button className="close-button" onClick={onClose}>Close</button>
      </div>
    </div>
  );
};

export default OrderDetails;
