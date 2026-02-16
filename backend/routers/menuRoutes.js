/**
 * @file menuRoutes.js
 * @description API routes for managing menu items (pizzas).
 */
const express = require('express');
const menuController = require('../controllers/menuController');
const router = express.Router();


router.get('/', menuController.getAllMenuItems);


const upload = require('../utils/fileUpload');

router.post('/add', upload.single('image'), menuController.addPizza);
router.patch('/:id', upload.single('image'), menuController.updatePizza);
router.patch('/toggle-availability/:id', menuController.toggleAvailability);
router.delete('/:id', menuController.deletePizza);
module.exports = router;