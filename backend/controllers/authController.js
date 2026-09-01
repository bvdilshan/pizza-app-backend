const User = require('../models/User');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

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
    
    if (!email || !password) {
        return res.status(400).json({ status: 'fail', message: 'Please provide email and password' });
    }

    const user = await User.findOne({ email });

    if (!user || !(await bcrypt.compare(password, user.password))) {
        return res.status(401).json({ status: 'fail', message: 'Email or Password incorrect' });
    }

    const token = jwt.sign({ id: user._id, role: user.role }, process.env.JWT_SECRET, { expiresIn: '1d' });

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