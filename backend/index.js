const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const bodyParser = require('body-parser');
const app = express();
const RegisterModel = require('./models/RegisterModel');
const JewelModel = require('./models/JewelModel');
const ServicesAppointmentModel = require('./models/ServicesAppointmentModel');
const NormalAppointmentModel = require('./models/NormalAppointmentModel');
const CartModel = require('./models/CartModel');
const OrderModel = require('./models/OrderModel');
const FeedbackModel = require('./models/FeedbackModel');

app.use(express.json());
app.use(cors());

mongoose.connect("mongodb://localhost:27017/krithik8898", {
  useNewUrlParser: true,
  useUnifiedTopology: true
});

app.put('/users/:id/role', async (req, res) => {
  const userId = req.params.id;
  const { role } = req.body;

  try {
    const user = await RegisterModel.findById(userId); // Updated this line
    if (!user) {
      return res.status(404).send('User not found');
    }

    user.role = role;
    await user.save();
    res.status(200).send('User role updated successfully');
  } catch (error) {
    res.status(500).send('Error updating user role');
  }
});






// User routes
app.get('/users', (req, res) => {
  RegisterModel.find()
    .then(users => res.json(users))
    .catch(err => res.status(500).json({ error: err.message }));
});

app.post('/login', (req, res) => {
  const { email, password } = req.body;
  RegisterModel.findOne({ email })
    .then(user => {
      if (user) {
        if (user.password === password) {
          res.json({ status: "success", role: user.role });
        } else {
          res.status(400).json({ error: "Incorrect password" });
        }
      } else {
        res.status(404).json({ error: "User not found" });
      }
    })
    .catch(err => res.status(500).json({ error: err.message }));
});

app.post('/register', (req, res) => {
  RegisterModel.create(req.body)
    .then(register => res.json(register))
    .catch(err => res.status(500).json({ error: err.message }));
});

// Jewel routes
app.post('/jewels', (req, res) => {
  JewelModel.create(req.body)
    .then(jewel => res.json(jewel))
    .catch(err => res.status(500).json({ error: err.message }));
});

app.get('/jewels', async (req, res) => {
  const category = req.query.category;
  try {
    const query = category ? { category } : {};
    const jewels = await JewelModel.find(query);
    res.json(jewels);
  } catch (error) {
    res.status(500).send('Error fetching jewelry items');
  }
});


app.put('/jewels/:id', (req, res) => {
  JewelModel.findByIdAndUpdate(req.params.id, req.body, { new: true })
    .then(jewel => res.json(jewel))
    .catch(err => res.status(500).json({ error: err.message }));
});

app.delete('/jewels/:id', (req, res) => {
  JewelModel.findByIdAndDelete(req.params.id)
    .then(() => res.json({ status: "success" }))
    .catch(err => res.status(500).json({ error: err.message }));
});

// Cart routes
app.post('/cart', (req, res) => {
  const { price, itemName, imageUrl, quantity } = req.body;
  const newItem = { itemName, imageUrl, price, quantity };
  if (!global.cartItems) {
    global.cartItems = []; // Initialize if not exists
  }
  const existingItemIndex = global.cartItems.findIndex(item => item.itemName === itemName && item.imageUrl === imageUrl);
  if (existingItemIndex > -1) {
    global.cartItems[existingItemIndex].quantity += quantity; // Increment quantity
  } else {
    global.cartItems.push(newItem); // Add new item
  }
  res.status(201).json({ message: 'Item added to cart', cartItems: global.cartItems });
});

app.get('/cart', (req, res) => {
  res.json(global.cartItems || []);
});


app.delete('/cart/:itemName', (req, res) => {
  const itemName = req.params.itemName;
  if (global.cartItems) {
    // Filter out the item with the given name
    global.cartItems = global.cartItems.filter(item => item.itemName !== itemName);
  }
  res.json(global.cartItems || []);
});


// Appointment routes
app.post('/servicesAppointments', (req, res) => {
  ServicesAppointmentModel.create(req.body)
    .then(appointment => res.json(appointment))
    .catch(err => res.status(500).json({ error: err.message }));
});

app.post('/normalAppointments', (req, res) => {
  NormalAppointmentModel.create(req.body)
    .then(appointment => res.json(appointment))
    .catch(err => res.status(500).json({ error: err.message }));
});

app.get('/normalAppointments', (req, res) => {
  NormalAppointmentModel.find()
    .then(appointments => res.json(appointments))
    .catch(err => res.status(500).json({ error: err.message }));
});

app.get('/servicesAppointments', (req, res) => {
  ServicesAppointmentModel.find()
    .then(appointments => res.json(appointments))
    .catch(err => res.status(500).json({ error: err.message }));
});

// Order routes
app.post('/orders', async (req, res) => {
  const { cartItems, shippingInfo, paymentDetails } = req.body;
  const totalPrice = cartItems.reduce((total, item) => total + item.price * item.quantity, 0);
  try {
    const newOrder = new OrderModel({
      cartItems,
      shippingInfo,
      paymentDetails,
      totalPrice,
      status: 'pending',
    });
    await newOrder.save();
    res.json(newOrder);
  } catch (error) {
    res.status(500).json({ error: 'Failed to create order' });
  }
});

app.get('/orders', async (req, res) => {
  try {
    const orders = await OrderModel.find();
    res.json(orders);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch orders' });
  }
});

app.delete('/orders/:id', async (req, res) => {
  try {
    const deletedOrder = await OrderModel.findByIdAndDelete(req.params.id);
    if (!deletedOrder) {
      return res.status(404).json({ error: 'Order not found' });
    }
    res.json({ message: 'Order deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: 'Failed to delete order' });
  }
});



app.put('/orders/:id/status', async (req, res) => {
  const { status } = req.body; // Get the new status from the request body
  try {
    const updatedOrder = await OrderModel.findByIdAndUpdate(req.params.id, { status }, { new: true });
    if (!updatedOrder) {
      return res.status(404).json({ error: 'Order not found' });
    }
    const phoneNumber = updatedOrder.shippingInfo.phone;
    handleWhatsAppMessage(phoneNumber, `Your order with ID: ${updatedOrder._id} has been updated to: ${status}.`);
    res.json(updatedOrder);
  } catch (error) {
    res.status(500).json({ error: 'Failed to update order status' });
  }
});
// Route to submit feedback
app.post('/feedback', (req, res) => {
  const { name, feedback } = req.body;
  FeedbackModel.create({ name, feedback })
    .then(feedback => res.status(201).json(feedback))
    .catch(err => res.status(500).json({ error: err.message }));
});

// Route to get feedbacks
app.get('/feedback', (req, res) => {
  FeedbackModel.find()
    .then(feedbacks => res.json(feedbacks))
    .catch(err => res.status(500).json({ error: err.message }));
});

// Route to fetch reviews for a jewelry item
app.get('/jewels/:id/reviews', (req, res) => {
  JewelModel.findById(req.params.id)
    .then(jewelryItem => res.json(jewelryItem.reviews))
    .catch(err => res.status(500).json({ error: err.message }));
});

// Route to add a review to a jewelry item
app.post('/jewels/:id/review', (req, res) => {
  const { username, rating, comment } = req.body;
  JewelModel.findById(req.params.id)
    .then(jewelryItem => {
      const newReview = { username, rating, comment };
      jewelryItem.reviews.push(newReview);
      jewelryItem.rating = calculateAverageRating(jewelryItem.reviews); // Update average rating
      jewelryItem.save()
        .then(updatedItem => res.json(updatedItem))
        .catch(err => res.status(500).json({ error: err.message }));
    })
    .catch(err => res.status(500).json({ error: err.message }));
});

// Helper function to calculate average rating
function calculateAverageRating(reviews) {
  const total = reviews.reduce((sum, review) => sum + review.rating, 0);
  return (total / reviews.length).toFixed(1); // Round to one decimal
}


// WhatsApp messaging function
const handleWhatsAppMessage = (phoneNumber, message) => {
  const whatsappUrl = `https://api.whatsapp.com/send?phone=${phoneNumber}&text=${encodeURIComponent(message)}`;
  // Here, you can send the message or open the WhatsApp URL directly
};

app.listen(3001, () => {
  console.log("Server is running on port 3001");
});
