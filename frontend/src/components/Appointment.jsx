import React, { useState } from 'react';
import axios from 'axios';
import '../styles/Appointment.css';
import makeupVideo from '../assets/bridal.mp4';
import bridalImage from '../assets/make.jpg';

const Appointment = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [bookingDate, setBookingDate] = useState('');
  const [sessions, setSessions] = useState([{ sessionType: '', timeSlot: '' }]);

  const handleSessionChange = (index, field, value) => {
    const newSessions = [...sessions];
    newSessions[index][field] = value;
    setSessions(newSessions);
  };

  const addSession = () => {
    setSessions([...sessions, { sessionType: '', timeSlot: '' }]);
  };

  const handleBooking = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:3001/normalAppointments', {
        name,
        email,
        phone,
        bookingDate,
        sessions,
      });

      console.log('Response from server:', response.data);
      alert('Booking received successfully! A confirmation email has been sent.');

      // Reset form fields
      setName('');
      setEmail('');
      setPhone('');
      setBookingDate('');
      setSessions([{ sessionType: '', timeSlot: '' }]); // Reset sessions
    } catch (error) {
      console.error('Error booking the appointment!', error);
      alert('There was an error booking the appointment. Please try again.');
    }
  };


  return (
    <div className="appointment-container">
      <video autoPlay muted loop className="background-video">
        <source src={makeupVideo} type="video/mp4" />
        Your browser does not support the video tag.
      </video>

      <div className="overlay">
        <h2 className="appointment-title">Schedule Your Appointment</h2>
        <p className="appointment-subtitle">Book a session with our experts</p>

        <section className="booking-form">
          <form onSubmit={handleBooking}>
            <div className="input-group">
              <input
                type="text"
                placeholder="Your Name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
              />
            </div>
            <div className="input-group">
              <input
                type="email"
                placeholder="Your Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
            <div className="input-group">
              <input
                type="tel"
                placeholder="Your Phone Number"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                required
              />
            </div>
            <div className="input-group">
              <input
                type="date"
                placeholder="Booking Date"
                value={bookingDate}
                onChange={(e) => setBookingDate(e.target.value)}
                required
              />
            </div>

            {sessions.map((session, index) => (
              <div key={index} className="session-input-group">
                <select
                  value={session.sessionType}
                  onChange={(e) => handleSessionChange(index, 'sessionType', e.target.value)}
                  required
                >
                  <option value="">Select Session Type</option>
                  <option value="Bridal">Bridal</option>
                  <option value="Party">Party</option>
                  <option value="Photoshoot">Photoshoot</option>
                  <option value="Engagement">Engagement</option>
                  <option value="Reception">Reception</option>
                  <option value="Mehendi">Mehendi</option>
                </select>
                <select
                  value={session.timeSlot}
                  onChange={(e) => handleSessionChange(index, 'timeSlot', e.target.value)}
                  required
                >
                  <option value="">Select Time Slot</option>
                  <option value="morning">Morning</option>
                  <option value="afternoon">Afternoon</option>
                  <option value="evening">Evening</option>
                  <option value="night">Night</option>
                </select>
              </div>
            ))}

            <button type="button" className="add-session-btn" onClick={addSession}>
              + Add Another Session
            </button>

            <button type="submit" className="submit-btn">Book Appointment</button>
          </form>
        </section>

        {/* <section className="bridal-image-section">
          <img src={bridalImage} alt="Bridal" className="bridal-image" />
        </section> */}
      </div>
    </div>
  );
};

export default Appointment;
