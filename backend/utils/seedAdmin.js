const mongoose = require('mongoose');
const dotenv = require('dotenv');
const User = require('../models/User');
const bcrypt = require('bcryptjs');
dotenv.config({ path: './.env' });

const seedAdmin = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI);
        console.log('MongoDB Connected...');

        const adminEmail = 'admin@crustoria.com';
        const adminPassword = 'adminpassword123';

        const existingAdmin = await User.findOne({ email: adminEmail });
        if (existingAdmin) {
            console.log('Admin user already exists');
            process.exit();
        }

        const newAdmin = new User({
            name: 'Admin User',
            email: adminEmail,
            password: adminPassword,
            address: 'Admin HQ',
            phone: '0000000000',
            role: 'admin'
        });

        await newAdmin.save();
        console.log('Admin user created successfully');
        console.log(`Email: ${adminEmail}`);
        console.log(`Password: ${adminPassword}`);
    } catch (err) {
        console.error(err);
    } finally {
        mongoose.disconnect();
        process.exit();
    }
};

seedAdmin();
