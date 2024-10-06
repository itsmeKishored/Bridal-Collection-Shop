import React from 'react';
import './serviceAppointmentDetails.css';

const ServiceAppointmentDetails = ({ appointment, onClose, onConfirm, onCancel }) => {
  return (
    <div className="appointment-details-overlay">
      <div className="appointment-details-modal">
        <h3>Service Appointment Details</h3>
        <p><strong>Name:</strong> {appointment.name}</p>
        <p><strong>Email:</strong> {appointment.email}</p>
        <p><strong>Phone:</strong> {appointment.phone}</p>
        <p><strong>Service Type:</strong> {appointment.serviceType}</p>
        <p><strong>Booking Date:</strong> {new Date(appointment.bookingDate).toLocaleString()}</p>
        <div className="button-group">
          <button className="confirm-button" onClick={onConfirm}>Confirm</button>
          <button className="cancel-button" onClick={onCancel}>Cancel</button>
          <button className="close-button" onClick={onClose}>Close</button>
        </div>
      </div>
    </div>
  );
};

export default ServiceAppointmentDetails;
