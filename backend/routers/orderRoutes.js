const express = require('express');
const orderController = require('../controllers/orderController');
const { protect } = require('../middleware/auth'); 
const router = express.Router();


router.post('/checkout', protect, orderController.placeOrder); 
router.get('/my-orders/:userId', protect, orderController.getMyOrders);


router.get('/all-orders', protect, orderController.getAllOrders); 


router.patch('/update-status/:id', protect, orderController.updateOrderStatus); 

module.exports = router;