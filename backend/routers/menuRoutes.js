const express = require('express');
const menuController = require('../controllers/menuController');
const upload = require('../utils/fileUpload');
const router = express.Router();

router.get('/', menuController.getAllMenuItems);
router.post('/add', protect, restrictTo('admin'), upload.single('image'), menuController.addPizza);
router.patch('/toggle-availability/:id', protect, restrictTo('admin'), menuController.toggleAvailability);
router.patch('/:id', protect, restrictTo('admin'), upload.single('image'), menuController.updatePizza);
router.delete('/:id', protect, restrictTo('admin'), menuController.deletePizza);

module.exports = router;