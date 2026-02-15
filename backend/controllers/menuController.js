const Pizza = require('../models/Pizza');


/**
 * @desc    Add a new pizza to the menu
 * @route   POST /api/menu/add
 * @access  Private (Admin)
 */
exports.addPizza = async (req, res) => {
    try {
        const pizzaData = {
            ...req.body,
            image: req.file ? req.file.path : undefined
        };
        const newPizza = await Pizza.create(pizzaData);
        res.status(201).json({ status: 'success', data: newPizza });
    } catch (err) {
        res.status(400).json({ status: 'fail', message: err.message });
    }
};


/**
 * @desc    Get all menu items (with optional category filter)
 * @route   GET /api/menu
 * @access  Public
 */
exports.getAllMenuItems = async (req, res) => {
    try {
        let filter = {};

        if (req.query.category && req.query.category !== 'All') {
            filter = { category: req.query.category };
        }

        const pizzas = await Pizza.find(filter);

        res.status(200).json({
            status: 'success',
            results: pizzas.length,
            data: pizzas
        });
    } catch (err) {
        res.status(400).json({ status: 'fail', message: err.message });
    }
};

exports.deletePizza = async (req, res) => {
    try {
        const pizza = await Pizza.findByIdAndDelete(req.params.id);

        if (!pizza) {
            return res.status(404).json({ status: 'fail', message: "Pizza not found" });
        }

        res.status(200).json({ status: 'success', message: "Pizza deleted successfully" });
    } catch (err) {
        res.status(400).json({ status: 'fail', message: err.message });
    }
};