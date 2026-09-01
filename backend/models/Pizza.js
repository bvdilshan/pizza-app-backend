const mongoose = require('mongoose');

const pizzaSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'A pizza must have a name'],
        trim: true
    },
    description: {
        type: String,
        required: [true, 'A pizza must have a description']
    },
    price: {
        type: Number,
        required: [true, 'A pizza must have a price']
    },
    category: {
        type: String,
        required: [true, 'A pizza must belong to a category']
    },
    image: {
        type: String,
        default: null
    },
    isAvailable: {
        type: Boolean,
        default: true
    }
}, { timestamps: true });

const Pizza = mongoose.model('Pizza', pizzaSchema);

module.exports = Pizza;