// Import the Mongoose library for MongoDB interactions
const mongoose = require('mongoose');

// Define the schema for the Restaurant collection
const RestaurantSchema = new mongoose.Schema({
  address: {
    building: { type: String }, // Building number of the restaurant
    street: { type: String },   // Street name where the restaurant is located
    zipcode: { type: String }   // Postal code of the restaurant's address
  },
  city: { type: String },        // City where the restaurant is located
  cuisine: { type: String },     // Type of cuisine the restaurant serves
  name: { type: String },        // Name of the restaurant
  restaurant_id: { type: String } // Unique restaurant identifier
});

module.exports = mongoose.model('Restaurant', RestaurantSchema, 'Restaurants');
