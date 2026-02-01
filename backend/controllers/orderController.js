
const Order = require('../models/Order');
const sendEmail = require('../utils/sendEmail');

exports.placeOrder = async (req, res) => {
    try {
        const orderData = {
            ...req.body,
            user: req.user ? req.user.id : req.body.user 
        };

        const newOrder = await Order.create(orderData);
        res.status(201).json({ status: 'success', data: newOrder });
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