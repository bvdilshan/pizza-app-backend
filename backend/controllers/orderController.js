
const Order = require('../models/Order');
const sendEmail = require('../utils/sendEmail');
const generateHash = require('../utils/payHere');

/**
 * @desc    Place a new order
 * @route   POST /api/orders/checkout
 * @access  Private
 */
exports.placeOrder = async (req, res) => {
    try {
        const orderData = {
            ...req.body,
            user: req.user ? req.user.id : req.body.user
        };

        const newOrder = await Order.create(orderData);

        let payHereData = null;

        // If PayHere, generate hash
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

/**
 * @desc    Get logged in user's orders
 * @route   GET /api/orders/my-orders/:userId
 * @access  Private
 */
exports.getMyOrders = async (req, res) => {
    try {
        const orders = await Order.find({ user: req.params.userId }).sort('-createdAt');
        res.status(200).json({ status: 'success', data: orders });
    } catch (err) {
        res.status(400).json({ status: 'fail', message: err.message });
    }
};

/**
 * @desc    Get all orders (Admin)
 * @route   GET /api/orders/all-orders
 * @access  Private (Admin)
 */
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

/**
 * @desc    Update order status
 * @route   PATCH /api/orders/update-status/:id
 * @access  Private (Admin)
 */
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