/**
 * @file User.js
 * @description User Mongoose Model
 */
const mongoose = require('mongoose');

/**
 * User Schema
 */
const userSchema = new mongoose.Schema({
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    address: { type: String, required: true },
    phone: { type: String, required: true },
    role: { type: String, default: 'customer' }
});

module.exports = mongoose.model('User', userSchema);