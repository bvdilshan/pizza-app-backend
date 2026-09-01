const Pizza = require('../models/Pizza');

exports.addPizza = async (req, res) => {
    try {
        const imageUrl = req.file ? req.file.location : null; 
        const newPizza = new Pizza({
            name: req.body.name,
            description: req.body.description,
            price: req.body.price,
            category: req.body.category,
            image: imageUrl
        });
        await newPizza.save();
        res.status(201).json({ status: 'success', data: newPizza });
    } catch (err) {
        console.error("ADD PIZZA ERROR:", err);
        res.status(400).json({ status: 'fail', message: err.message, errorDetails: err.toString() });
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
            image: req.file ? req.file.location : pizza.image 
        };

        const updatedPizza = await Pizza.findByIdAndUpdate(req.params.id, updatedData, { new: true, runValidators: true });

        res.status(200).json({ status: 'success', data: updatedPizza });
    } catch (err) {
        console.error("UPDATE PIZZA ERROR:", err);
        res.status(400).json({ status: 'fail', message: err.message, errorDetails: err.toString() });
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