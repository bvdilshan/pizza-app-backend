const express = require('express');
const menuController = require('../controllers/menuController');
const upload = require('../utils/fileUpload');
const router = express.Router();

router.get('/', menuController.getAllMenuItems);
router.post('/add', upload.single('image'), menuController.addPizza);
router.patch('/toggle-availability/:id', menuController.toggleAvailability);
router.patch('/:id', upload.single('image'), menuController.updatePizza);
router.delete('/:id', menuController.deletePizza);

module.exports = router;