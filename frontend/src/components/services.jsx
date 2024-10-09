import React, { useState } from 'react';
import '../styles/Services.css';
import makeupVideo from '../assets/makeup.mp4';
import Header from './Header';

const servicesData = [
  {
    id: 1,
    image: 'https://i.pinimg.com/originals/7d/3a/69/7d3a695cc901a6661c8b5230d55634a2.jpg',
    title: 'Manicure',
    options: [
      { type: 'Classic Manicure', price: '271', duration: '30 min' },
      { type: 'Spearmint Manicure', price: '354', duration: '40 min' },
      { type: 'Cocoa Butter Manicure', price: '472', duration: '50 min' },
    ],
  },
  {
    id: 2,
    image: 'https://tse3.mm.bing.net/th?id=OIP.zXnR6HOGAOthKNQhS5_EiAHaJy&pid=Api&P=0&h=180',
    title: 'Pedicure',
    options: [
      { type: 'Classic Pedicure', price: '$413', duration: '45 min' },
      { type: 'Spearmint Pedicure', price: '590', duration: '50 min' },
      { type: 'Cocoa Butter Pedicure', price: '643', duration: '60 min' },
    ],
  },
  {
    id: 3,
    image: 'https://up.yimg.com/ib/th?id=OIP.-ZQt1AL02AXnSb-qgD807QAAAA&pid=Api&rs=1&c=1&qlt=95&w=169&h=112',
    title: 'Facial',
    options: [
      { type: 'Skin Brightening Facial', price: '2600', duration: '60 min' },
      { type: 'Beauty & Glow Facial', price: '4000', duration: '75 min' },
    ],
  },
  {
    id: 4,
    image: 'https://tse1.mm.bing.net/th?id=OIP.NGGemsD5WOCS9z1VFyCsIQHaJL&pid=Api&P=0&h=180',
    title: 'Haircut',
    options: [
      { type: 'Smoothing', price: '$350', duration: '45 min' },
      { type: 'Trimming', price: '$450', duration: '30 min' },
      { type: 'Straightening', price: '450', duration: '60 min' },
    ],
  },
  {
    id: 5,
    image: 'https://tse2.mm.bing.net/th?id=OIP.zVU8tncubKxd_1EjtQb5nAHaFj&pid=Api&P=0&h=180',
    title: 'Foundation',
    options: [],
  },
  {
    id: 6,
    image: 'https://tse3.mm.bing.net/th?id=OIP.1EVOz2TOFu6eFo0gIn_AegHaEK&pid=Api&P=0&h=180',
    title: 'Eyebrow Shaping',
    options: [
      { type: 'Eyebrows', price: '70', duration: '15 min' },
      { type: 'Forehead', price: '90', duration: '10 min' },
      { type: 'Chin & Neck', price: '100', duration: '20 min' },
      { type: 'Full Face', price: '100', duration: '30 min' },
    ],
  },
];


const Services = () => {
  const [selectedService, setSelectedService] = useState(null);
  const [selectedOption, setSelectedOption] = useState(null);
  const [email, setEmail] = useState('');
  const [name, setName] = useState('');
  const [date, setDate] = useState('');
  const [time, setTime] = useState('');
  const [persons, setPersons] = useState('');
  const [phoneno, setPhomeno] = useState('');

  const handleSelectService = (service) => {
    setSelectedService(service);
    setSelectedOption(null);
  };

  const handleSelectOption = (option) => {
    setSelectedOption(option);
  };

  const isFutureDate = (inputDate) => {
    const today = new Date();
    const selectedDate = new Date(inputDate);
    return selectedDate > today;
  };

  const isValidTime = (inputTime) => {
    const [hours, minutes] = inputTime.split(':');
    const timeInMinutes = parseInt(hours) * 60 + parseInt(minutes);
    const startTimeInMinutes = 9 * 60; // 9:00 AM
    const endTimeInMinutes = 17 * 60; // 5:00 PM
    return timeInMinutes >= startTimeInMinutes && timeInMinutes <= endTimeInMinutes;
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!isFutureDate(date)) {
      alert('Please select a future date.');
      return;
    }

    if (!isValidTime(time)) {
      alert('Please select a time between 9:00 AM and 5:00 PM.');
      return;
    }

    const data = {
      name,
      email,
      phone: phoneno,
      bookingDate: date,
      time,
      persons,
      sessions: selectedService.title,
      option: selectedOption ? selectedOption.type : '',
    };

    try {
      const response = await fetch('http://localhost:3001/servicesAppointments', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });

      if (response.ok) {
        alert('Booking received!');
        // Reset form fields
        setSelectedService(null);
        setSelectedOption(null);
        setEmail('');
        setName('');
        setDate('');
        setTime('');
        setPersons('');
        setPhomeno('');
      } else {
        alert('Failed to book appointment. Please try again.');
      }
    } catch (error) {
      console.error('Error:', error);
      alert('An error occurred. Please try again.');
    }
  };

  return (
    <div>
      <div className="full-page-booking-widget">
        <video autoPlay muted loop className="background-video">
          <source src={makeupVideo} type="video/mp4" />
          Your browser does not support the video tag.
        </video>
        <div className="overlay">
          <div className="booking-header">
            <h2>Booking widget</h2>
          </div>

          {selectedService && (
            <div className="appointment-form">
              <h3>Book Appointment for {selectedService.title}</h3>
              {selectedOption && (
                <p>
                  Selected Option: {selectedOption.type} - {selectedOption.price} - {selectedOption.duration}
                </p>
              )}
              <form onSubmit={handleSubmit}>
                <div>
                  <label>Name:</label>
                  <input
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    required
                  />
                </div>
                <div>
                  <label>Email:</label>
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                  />
                </div>
                <div>
                  <label>Phone no:</label>
                  <input
                    type="number"
                    value={phoneno}
                    onChange={(e) => setPhomeno(e.target.value)}
                    required
                  />
                </div>
                <div>
                  <label>Date:</label>
                  <input
                    type="date"
                    value={date}
                    onChange={(e) => setDate(e.target.value)}
                    required
                  />
                </div>
                <div>
                  <label>Time:</label>
                  <input
                    type="time"
                    value={time}
                    onChange={(e) => setTime(e.target.value)}
                    required
                  />
                </div>
                <div>
                  <label>No of persons:</label>
                  <input
                    type="number"
                    value={persons}
                    onChange={(e) => setPersons(e.target.value)}
                    required
                  />
                </div>
                {selectedService.options.length > 0 && (
                  <div>
                    <label>Choose an Option:</label>
                    <select
                      onChange={(e) =>
                        handleSelectOption(
                          selectedService.options.find((opt) => opt.type === e.target.value)
                        )
                      }
                      required
                    >
                      <option value="">Select an option</option>
                      {selectedService.options.map((option) => (
                        <option key={option.type} value={option.type}>
                          {option.type} - {option.price} - {option.duration}
                        </option>
                      ))}
                    </select>
                  </div>
                )}
                <div className="button">
                  <button type="submit">Submit</button>
                  <button type="button" onClick={() => setSelectedService(null)}>Cancel</button>
                </div>
              </form>
            </div>
          )}

          <div className="services-container">
            {servicesData.map((service) => (
              <div className="service-card" key={service.id}>
                <div className="service-image">
                  <img src={service.image} alt={service.title} />
                </div>
                <div className="service-info">
                  <h3>{service.title}</h3>
                  {service.options.length > 0 && (
                    <ul>
                      {service.options.map((option) => (
                        <li key={option.type}>
                          {option.type} - {option.price} - {option.duration}
                        </li>
                      ))}
                    </ul>
                  )}
                  <button onClick={() => handleSelectService(service)}>Select</button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Services;








