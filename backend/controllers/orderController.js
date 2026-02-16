/**
 * @file orderController.js
 * @description Controller functions for order processing, history, and analytics.
 */
const Order = require('../models/Order');
const User = require('../models/User');
const sendEmail = require('../utils/sendEmail');
const generateHash = require('../utils/payHere');

exports.placeOrder = async (req, res) => {
    try {
        const orderData = {
            ...req.body,
            user: req.user ? req.user.id : req.body.user
        };

        const newOrder = await Order.create(orderData);

        let payHereData = null;

        if (req.body.paymentMethod === 'PayHere') {
            const merchantId = process.env.PAYHERE_MERCHANT_ID;
            const currency = 'LKR';
            const hash = generateHash(newOrder._id.toString(), newOrder.totalAmount, currency);

            payHereData = {
                merchant_id: merchantId,
                return_url: `http://localhost:5173/payment/success`,
                cancel_url: `http://localhost:5173/payment/cancel`,
                notify_url: `http://localhost:5000/api/orders/notify`,
                order_id: newOrder._id.toString(),
                items: "Pizza Order",
                currency: currency,
                amount: newOrder.totalAmount.toFixed(2),
                hash: hash,
                first_name: req.user ? req.user.name : "Customer",
                last_name: "",
                email: req.user ? req.user.email : "customer@example.com",
                phone: req.user ? req.user.phone : "0000000000",
                address: req.user ? req.user.address : "Colombo",
                city: "Colombo",
                country: "Sri Lanka"
            };
        }

        res.status(201).json({
            status: 'success',
            data: newOrder,
            payHereData: payHereData
        });
    } catch (err) {
        res.status(400).json({ status: 'fail', message: err.message });
    }
};

exports.getMyOrders = async (req, res) => {
    try {
        const orders = await Order.find({ user: req.params.userId }).sort('-createdAt');
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

        if (status === 'Delivered' && order.user && order.user.email) {
            const customerEmail = order.user.email;
            const customerName = order.user.name;

            sendEmail({
                email: customerEmail,
                subject: 'Order Delivered - Pizza Hut ',
                message: `Hi ${customerName}, your pizza order has been delivered successfully!\n\nOrder ID: #${order._id.toString().slice(-6)}\nTotal Amount: Rs. ${order.totalAmount}\nAddress: ${order.address}`
            }).then(() => {
                console.log(`Email sent to Customer: ${customerEmail} `);
            }).catch(emailErr => {
                console.error("Email delivery failed background :", emailErr.message);
            });
        }


        res.status(200).json({ status: 'success', data: order });

    } catch (err) {
        console.error("Update Status Error:", err.message);
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