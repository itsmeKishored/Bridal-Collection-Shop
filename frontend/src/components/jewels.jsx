import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import '../styles/jewels.css'; // Ensure this file is included

const Jewels = () => {
  const navigate = useNavigate();
  const [jewelryItems, setJewelryItems] = useState([]); // State to hold the jewels fetched from the database
  const [zoomedImage, setZoomedImage] = useState(null);
  const [likesCount, setLikesCount] = useState({});
  const [showShareOptions, setShowShareOptions] = useState(false);
  const [currentItem, setCurrentItem] = useState(null);

  // Fetch jewels from the database
  useEffect(() => {
    axios.get('http://localhost:3001/jewels') // Update the URL with your API endpoint
      .then(response => setJewelryItems(response.data))
      .catch(error => console.error('Error fetching jewelry items:', error));
  }, []);

  const handleImageClick = (item) => {
    setCurrentItem(item);
    setZoomedImage(item.imageUrl);
    setShowShareOptions(false);
  };

  const handleLike = (item) => {
    setLikesCount((prev) => ({
      ...prev,
      [item.name]: (prev[item.name] || 0) + 1,
    }));
  };

  const handleShareToggle = () => {
    setShowShareOptions((prev) => !prev);
  };

  const handlePurchase = (price, itemName, imageUrl) => {
    axios
      .post('http://localhost:3001/cart', {
        price,
        itemName,
        imageUrl,
        quantity: 1, // Assuming 1 item is added at a time
      })
      .then((response) => {
        console.log('Item added to cart:', response.data);
        // Optionally navigate to the cart page after adding
        navigate('/cart'); // Navigate to the cart page after adding
      })
      .catch((error) => console.error('Error adding to cart:', error));
  };

  return (
    <div className="jewels-page">
      <div className='top'>
        <h1>Jewelry Collection</h1>
      </div>
      <main>
        <section className="jewelry-collection">
          <div className="grid-container">
            {jewelryItems.map((item, index) => (
              <div className="grid-item" key={index} onClick={() => handleImageClick(item)}>
                <img src={item.imageUrl} alt={item.name} />
                <h3>{item.name}</h3>
                <p>Price: ₹{item.price}</p>
                <button onClick={(e) => { e.stopPropagation(); handlePurchase(item.price, item.name, item.imageUrl); }}>
                  Add to Cart
                </button>
              </div>
            ))}
          </div>
        </section>

        {zoomedImage && (
          <div className="popup">
            <span className="close" onClick={() => setZoomedImage(null)}>✖</span>
            <img src={zoomedImage} alt={currentItem?.name} />
            <h3>{currentItem?.name}</h3>
            <p>Price: ₹{currentItem?.price}</p>
            <p>Rating: {currentItem?.rating} ⭐</p>
            <p>Description: {currentItem?.description}</p> {/* Display the description */}
            <div className="like-share">
              <button onClick={() => handleLike(currentItem)}>❤️ Like {likesCount[currentItem?.name] || 0}</button>
              <button onClick={handleShareToggle}>Share</button>
              {showShareOptions && (
                <div className="share-options">
                  <p>Share via:</p>
                  <a
                    href={`https://wa.me/?text=Check out this jewelry: ${currentItem?.name} - ₹${currentItem?.price}`}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    WhatsApp
                  </a>
                  <a
                    href={`mailto:?subject=Check out this jewelry!&body=Check out this jewelry: ${currentItem?.name} - ₹${currentItem?.price}`}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    Email
                  </a>
                </div>
              )}
            </div>
          </div>
        )}
      </main>
    </div>
  );
};

export default Jewels;
