const express = require('express');
const menuController = require('../controllers/menuController');
const router = express.Router();


router.get('/', menuController.getAllMenuItems);


router.post('/add', menuController.addPizza); 
router.delete('/:id', menuController.deletePizza);
module.exports = router;