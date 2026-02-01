const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema({
    user: { 
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'User', 
        required: true 
    },
    items: [
        {
            pizza: { type: mongoose.Schema.Types.ObjectId, ref: 'Pizza' },
            quantity: { type: Number, default: 1 },
            price: Number
        }
    ],
    totalAmount: { type: Number, required: true },
    address: { type: String, required: true },
    phone: { type: String, required: true },
    status: {
    type: String,
    enum: ['Placed', 'Preparing', 'On the Way', 'Delivered'], 
    default: 'Placed'
},
    paymentMethod: { type: String, default: 'COD' },
    createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Order', orderSchema);