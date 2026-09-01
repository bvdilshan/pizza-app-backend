const express = require('express');
const orderController = require('../controllers/orderController');
const { protect, restrictTo } = require('../middleware/authMiddleware');
const router = express.Router();

router.post('/checkout', protect, orderController.placeOrder);
router.get('/my-orders', protect, orderController.getMyOrders);
router.get('/all-orders', protect, restrictTo('admin'), orderController.getAllOrders);
router.patch('/update-status/:id', protect, restrictTo('admin'), orderController.updateOrderStatus);
router.get('/analytics', protect, restrictTo('admin'), orderController.getAnalytics);

module.exports = router;