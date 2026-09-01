const Order = require('../models/Order');
const User = require('../models/User');

exports.placeOrder = async (req, res) => {
    try {
        const orderData = {
            ...req.body,
            paymentMethod: 'COD',
            user: req.user.id
        };

        const newOrder = await Order.create(orderData);

        res.status(201).json({
            status: 'success',
            data: newOrder
        });
    } catch (err) {
        res.status(400).json({ status: 'fail', message: err.message });
    }
};

exports.getMyOrders = async (req, res) => {
    try {
        const orders = await Order.find({ user: req.user.id }).sort('-createdAt');
        res.status(200).json({ status: 'success', data: orders });
    } catch (err) {
        res.status(400).json({ status: 'fail', message: err.message });
    }
};

exports.getAllOrders = async (req, res) => {
    try {
        const orders = await Order.find()
            .populate('user', 'name email phone')
            .sort('-createdAt');
        res.status(200).json({ status: 'success', data: orders });
    } catch (err) {
        res.status(400).json({ status: 'fail', message: err.message });
    }
};

exports.updateOrderStatus = async (req, res) => {
    try {
        const { status } = req.body;
        const order = await Order.findById(req.params.id).populate('user');

        if (!order) {
            return res.status(404).json({ status: 'fail', message: 'Order not found' });
        }

        order.status = status;
        await order.save();

        res.status(200).json({ status: 'success', data: order });

    } catch (err) {
        res.status(400).json({ status: 'fail', message: err.message });
    }
};

exports.getAnalytics = async (req, res) => {
    try {
        const totalRevenue = await Order.aggregate([
            { $match: { status: 'Delivered' } },
            { $group: { _id: null, total: { $sum: "$totalAmount" } } }
        ]);

        const totalOrders = await Order.countDocuments();
        const completedOrders = await Order.countDocuments({ status: 'Delivered' });
        const pendingOrders = await Order.countDocuments({ status: 'Placed' });
        const activeUsers = await User.countDocuments({ role: 'customer' });

        const topSelling = await Order.aggregate([
            { $unwind: "$items" },
            {
                $group: {
                    _id: "$items.pizza",
                    count: { $sum: "$items.quantity" }
                }
            },
            { $sort: { count: -1 } },
            { $limit: 5 },
            {
                $lookup: {
                    from: "pizzas",
                    localField: "_id",
                    foreignField: "_id",
                    as: "pizzaDetails"
                }
            },
            { $unwind: "$pizzaDetails" },
            {
                $project: {
                    name: "$pizzaDetails.name",
                    count: 1,
                    image: "$pizzaDetails.image"
                }
            }
        ]);

        res.status(200).json({
            status: 'success',
            data: {
                revenue: totalRevenue[0] ? totalRevenue[0].total : 0,
                totalOrders,
                completedOrders,
                pendingOrders,
                activeUsers,
                topSelling
            }
        });

    } catch (err) {
        res.status(400).json({ status: 'fail', message: err.message });
    }
};