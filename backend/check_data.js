const mongoose = require('mongoose');
const dotenv = require('dotenv');
const Order = require('./models/Order');
const Pizza = require('./models/Pizza');

dotenv.config({ path: './.env' });

const checkData = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI);
        console.log('MongoDB Connected...');

        const orderCount = await Order.countDocuments();
        const pizzaCount = await Pizza.countDocuments();

        console.log(`Total Orders: ${orderCount}`);
        console.log(`Total Pizzas: ${pizzaCount}`);

        if (orderCount === 0) {
            console.log("No orders found. AdminOrders page will be empty.");
        }
    } catch (err) {
        console.error(err);
    } finally {
        mongoose.disconnect();
        process.exit();
    }
};

checkData();
