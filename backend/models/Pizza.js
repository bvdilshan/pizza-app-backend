/**
 * @file Pizza.js
 * @description Pizza Mongoose Model
 */
const mongoose = require('mongoose');

/**
 * Pizza Schema
 */
const pizzaSchema = new mongoose.Schema({
    name: { type: String, required: true },
    size: { type: String, enum: ['Small', 'Medium', 'Large'], required: true },
    price: { type: Number, required: true },
    category: {
        type: String,

        default: 'Veg',
        enum: ['Veg', 'Meat', 'Chicken', 'Seafood', 'All']
    },
    description: String,
    image: String,
    isAvailable: { type: Boolean, default: true }
});

module.exports = mongoose.model('Pizza', pizzaSchema);