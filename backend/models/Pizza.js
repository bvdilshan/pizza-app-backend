/**
 * @file Pizza.js
 * @description Mongoose schema for Pizza menu items.
 */
const mongoose = require('mongoose');

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
    isAvailable: { type: Boolean, default: true },
    styles: {
        type: [String],
        enum: ['Pan Pizza', 'Thin ‘N Crispy', 'Stuffed Crust', 'Cheese Lovers', 'Supreme', 'BBQ Chicken', 'Veggie Lovers', 'Hawaiian'],
        default: []
    },
    isCustomizable: { type: Boolean, default: false }
});

module.exports = mongoose.model('Pizza', pizzaSchema);