/**
 * @file menuController.js
 * @description Controller functions for managing menu items (pizzas).
 */
const Pizza = require('../models/Pizza');


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

exports.updatePizza = async (req, res) => {
    try {
        const pizza = await Pizza.findById(req.params.id);

        if (!pizza) {
            return res.status(404).json({ status: 'fail', message: "Pizza not found" });
        }

        const updatedData = {
            ...req.body,
            image: req.file ? req.file.path : pizza.image
        };

        const updatedPizza = await Pizza.findByIdAndUpdate(req.params.id, updatedData, { new: true });

        res.status(200).json({ status: 'success', data: updatedPizza });
    } catch (err) {
        res.status(400).json({ status: 'fail', message: err.message });
    }
};


exports.toggleAvailability = async (req, res) => {
    try {
        const pizza = await Pizza.findById(req.params.id);

        if (!pizza) {
            return res.status(404).json({ status: 'fail', message: "Pizza not found" });
        }

        pizza.isAvailable = !pizza.isAvailable;
        await pizza.save();

        res.status(200).json({ status: 'success', data: pizza });
    } catch (err) {
        res.status(400).json({ status: 'fail', message: err.message });
    }
};