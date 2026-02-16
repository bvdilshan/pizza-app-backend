/**
 * @file authController.js
 * @description Controller functions for user authentication (signup, login, get users).
 */
const User = require('../models/User');
const jwt = require('jsonwebtoken');

exports.signup = async (req, res) => {
    try {
        const newUser = await User.create(req.body);
        res.status(201).json({ status: 'success', data: newUser });
    } catch (err) {
        res.status(400).json({ status: 'fail', message: err.message });
    }
};

exports.login = async (req, res) => {
    const { email, password } = req.body;
    const user = await User.findOne({ email, password });

    if (!user) {
        return res.status(401).json({ status: 'fail', message: 'Email or Password incorrect' });
    }


    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '1d' });

    res.status(200).json({
        status: 'success',
        token,
        user: {
            _id: user._id,
            name: user.name,
            role: user.role,
            email: user.email,
            address: user.address,
            phone: user.phone
        }
    });
};

exports.getAllUsers = async (req, res) => {
    try {
        const users = await User.find();
        res.status(200).json({ status: 'success', results: users.length, data: users });
    } catch (err) {
        res.status(400).json({ status: 'fail', message: err.message });
    }
};