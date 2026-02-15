const express = require('express');
const menuController = require('../controllers/menuController');
const router = express.Router();


router.get('/', menuController.getAllMenuItems);


const upload = require('../utils/fileUpload');

router.post('/add', upload.single('image'), menuController.addPizza);
router.delete('/:id', menuController.deletePizza);
module.exports = router;