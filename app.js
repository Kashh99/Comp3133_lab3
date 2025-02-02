const express = require('express');
const mongoose = require('mongoose');
require('dotenv').config();

const app = express();
const Restaurant = require('./models/restaurant');

const dbURI = process.env.MONGODB_URI;

// Connect to MongoDB Atlas
mongoose.connect(dbURI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('MongoDB connected'))
  .catch(err => console.error('MongoDB connection error:', err));

/**
 * GET /restaurants/Delicatessen
 * Returns restaurants with cuisine 'Delicatessen' and city not 'Brooklyn'.
 * Selects only cuisine, name, and city, sorted by name (ascending).
 */
app.get('/restaurants/Delicatessen', async (req, res) => {
  try {
    const restaurants = await Restaurant.find(
      { cuisine: 'Delicatessen', city: { $ne: 'Brooklyn' } },
      { _id: 0, cuisine: 1, name: 1, city: 1 }
    ).sort({ name: 1 });

    res.json(restaurants);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

/**
 * GET /restaurants/cuisine/:cuisine
 * Returns all restaurants matching the specified cuisine.
 */
app.get('/restaurants/cuisine/:cuisine', async (req, res) => {
  try {
    const restaurants = await Restaurant.find({ cuisine: req.params.cuisine });
    res.json(restaurants);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

/**
 * GET /restaurants
 * Returns all restaurant details.
 * If query param `sortBy=ASC` or `sortBy=DESC` is provided, sorts by restaurant_id.
 */
app.get('/restaurants', async (req, res) => {
  try {
    if (req.query.sortBy) {
      const sortOrder = req.query.sortBy.toUpperCase() === 'DESC' ? -1 : 1;
      const restaurants = await Restaurant.find(
        {},
        { _id: 1, cuisine: 1, name: 1, city: 1, restaurant_id: 1 }
      ).sort({ restaurant_id: sortOrder });

      return res.json(restaurants);
    } 
    const restaurants = await Restaurant.find();
    return res.json(restaurants);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
