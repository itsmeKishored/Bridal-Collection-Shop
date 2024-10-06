import React from 'react';
import '../styles/Location.css'; // Ensure this CSS file is properly linked

const Location = () => {
  return (
    <main className="location-container">
      <h2>Our Location</h2>
      <p>Find us at the address below and visit our store to explore our bridal collection.</p>
      
      <div className="address">
        <h3>Address:</h3>
        <p>Erode to Perundurai Road, Mettukadai, Erode 638107</p>
        <p><strong>Phone:</strong> 9715677872</p>
        <p><strong>Email:</strong> <a href="mailto:info@avirasbridal.com">info@avirasbridal.com</a></p>
      </div>

      <div className="map-container">
        <h3>Find Us on the Map:</h3>
        <iframe
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3916.858807569179!2d77.5663575!3d11.2979535!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3ba96de96abfda3b%3A0x6efac0dc8bca46bf!2sAviras%20bridal%20collections!5e0!3m2!1sen!2sin!4v1693311245468!5m2!1sen!2sin"
          width="100%"
          height="400"
          style={{ border: 0 }}
          allowFullScreen=""
          loading="lazy"
          title="Location Map"
        ></iframe>
      </div>
    </main>
  );
};

export default Location;
