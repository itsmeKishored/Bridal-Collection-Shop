import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import '../styles/jewels.css';

const Jewels = () => {
  const navigate = useNavigate();
  const [jewelryItems, setJewelryItems] = useState([]); // State to hold the jewels fetched from the database
  const [filteredItems, setFilteredItems] = useState([]); // State to hold filtered jewelry items
  const [categories, setCategories] = useState([]); // State to hold available categories
  const [selectedCategory, setSelectedCategory] = useState('All'); // State for the selected category
  const [zoomedImage, setZoomedImage] = useState(null); // State for zoomed image
  const [likesCount, setLikesCount] = useState({}); // State for like count per item
  const [showShareOptions, setShowShareOptions] = useState(false); // State to show/hide share options
  const [currentItem, setCurrentItem] = useState(null); // State for the currently selected item
  const [reviews, setReviews] = useState([]); // State to hold reviews
  const [newReview, setNewReview] = useState({ username: '', rating: 1, comment: '' }); // State for new review

  // Fetch jewels and categories from the database
  useEffect(() => {
    axios.get('http://localhost:3001/jewels')
      .then(response => {
        setJewelryItems(response.data);
        setFilteredItems(response.data); // Initially, display all items
        const uniqueCategories = ['All', ...new Set(response.data.map(item => item.category))]; // Get unique categories
        setCategories(uniqueCategories);
      })
      .catch(error => console.error('Error fetching jewelry items:', error));
  }, []);

  // Fetch reviews for the selected item
  const fetchReviews = (itemId) => {
    axios.get(`http://localhost:3001/jewels/${itemId}/reviews`)
      .then(response => setReviews(response.data))
      .catch(error => console.error('Error fetching reviews:', error));
  };

  // Handle image click (zoom in and show details)
  const handleImageClick = (item) => {
    setCurrentItem(item);
    setZoomedImage(item.imageUrl);
    setShowShareOptions(false);
    fetchReviews(item._id); // Fetch reviews when the item is clicked
  };

  // Handle like functionality
  const handleLike = (item) => {
    setLikesCount((prev) => ({
      ...prev,
      [item.name]: (prev[item.name] || 0) + 1,
    }));
  };

  // Handle share toggle for sharing options
  const handleShareToggle = () => {
    setShowShareOptions((prev) => !prev);
  };

  // Handle purchase functionality (add item to cart)
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
        navigate('/cart'); // Navigate to the cart page after adding
      })
      .catch((error) => console.error('Error adding to cart:', error));
  };

  // Handle review submission
  const handleReviewSubmit = (e) => {
    e.preventDefault();
    axios.post(`http://localhost:3001/jewels/${currentItem._id}/review`, newReview)
      .then(response => {
        setReviews([...reviews, newReview]); // Add the new review to the displayed list
        setNewReview({ username: '', rating: 1, comment: '' }); // Reset the review form
      })
      .catch(error => console.error('Error submitting review:', error));
  };

  // Handle category filter change
  const handleCategoryChange = (e) => {
    const category = e.target.value;
    setSelectedCategory(category);

    if (category === 'All') {
      setFilteredItems(jewelryItems); // Show all items if 'All' is selected
    } else {
      const filtered = jewelryItems.filter(item => item.category === category);
      setFilteredItems(filtered); // Show only items matching the selected category
    }
  };

  return (
    <div className="jewels-page">
      <div className="top">
        <h1>Jewelry Collection</h1>

        {/* Category Filter Dropdown */}
        <select value={selectedCategory} onChange={handleCategoryChange} className="category-filter">
          {categories.map((category, index) => (
            <option key={index} value={category}>
              {category}
            </option>
          ))}
        </select>
      </div>
      <main>
        <section className="jewelry-collection">
          <div className="grid-container">
            {filteredItems.map((item, index) => (
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
            <p>Rating: {currentItem?.rating || 'No ratings yet'} ⭐</p>
            <p>Description: {currentItem?.description}</p>
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

            {/* Review Section */}
            <h3>Reviews</h3>
            <div className="reviews-section">
              {reviews.length > 0 ? (
                reviews.map((review, index) => (
                  <div key={index} className="review-item">
                    <p><strong>{review.username}</strong>: {review.rating} ⭐</p>
                    <p>{review.comment}</p>
                  </div>
                ))
              ) : (
                <p>No reviews yet.</p>
              )}
            </div>

            {/* Submit Review Form */}
            <form onSubmit={handleReviewSubmit} className="review-form">
              <input
                type="text"
                placeholder="Your Name"
                value={newReview.username}
                onChange={(e) => setNewReview({ ...newReview, username: e.target.value })}
                required
              />
              <select
                value={newReview.rating}
                onChange={(e) => setNewReview({ ...newReview, rating: parseInt(e.target.value) })}
                required
              >
                <option value="1">1 Star</option>
                <option value="2">2 Stars</option>
                <option value="3">3 Stars</option>
                <option value="4">4 Stars</option>
                <option value="5">5 Stars</option>
              </select>
              <textarea
                placeholder="Your Review"
                value={newReview.comment}
                onChange={(e) => setNewReview({ ...newReview, comment: e.target.value })}
                required
              />
              <button type="submit">Submit Review</button>
            </form>
          </div>
        )}
      </main>
    </div>
  );
};

export default Jewels;
