const mongoose = require('mongoose');
const dotenv = require('dotenv');
const Pizza = require('../models/Pizza');
const Order = require('../models/Order');
const User = require('../models/User');

dotenv.config({ path: './.env' });

const seedData = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI);
        console.log('MongoDB Connected...');


        // 1. Create Pizzas
        const pizzas = [
            {
                name: 'Margherita',
                category: 'Veg',
                price: 1200,
                size: 'Medium',
                description: 'Classic delight with 100% real mozzarella cheese.',
                image: 'https://res.cloudinary.com/demo/image/upload/v1/samples/food/pot-mussels.jpg'
            },
            {
                name: 'Chicken Sausage',
                category: 'Chicken',
                price: 1500,
                size: 'Medium',
                description: 'Chicken sausage and cheese.',
                image: 'https://res.cloudinary.com/demo/image/upload/v1/samples/food/fish-vegetables.jpg'
            },
            {
                name: 'Pepperoni',
                category: 'Meat',
                price: 1800,
                size: 'Medium',
                description: 'American classic! Spicy pepperoni, chicken and cheese.',
                image: 'https://res.cloudinary.com/demo/image/upload/v1/samples/food/dessert.jpg'
            }
        ];

        const createdPizzas = await Pizza.insertMany(pizzas);
        console.log('Pizzas Seeded');

        // 2. Create a Customer User
        let customer = await User.findOne({ email: 'customer@example.com' });
        if (!customer) {
            customer = await User.create({
                name: 'John Doe',
                email: 'customer@example.com',
                password: 'password123',
                address: '123 Main St, Colombo',
                phone: '0771234567',
                role: 'customer'
            });
            console.log('Customer User Created');
        }

        // 3. Create Orders
        const orders = [
            {
                user: customer._id,
                items: [
                    { pizza: createdPizzas[0]._id, quantity: 1, price: 1200 },
                    { pizza: createdPizzas[1]._id, quantity: 2, price: 1500 }
                ],
                totalAmount: 4200,
                status: 'Placed',
                address: '123 Main St, Colombo',
                phone: '0771234567'
            },
            {
                user: customer._id,
                items: [
                    { pizza: createdPizzas[2]._id, quantity: 1, price: 1800 }
                ],
                totalAmount: 1800,
                status: 'Preparing',
                address: '123 Main St, Colombo',
                phone: '0771234567'
            }
        ];

        await Order.insertMany(orders);
        console.log('Orders Seeded');

    } catch (err) {
        console.error(err);
    } finally {
        mongoose.disconnect();
        process.exit();
    }
};

seedData();
