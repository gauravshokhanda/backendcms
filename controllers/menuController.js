const Menu = require("../models/Menu.js");

// Get all menu items, sorted by sortOrder
exports.getMenus = async (req, res) => {
    try {
        const menus = await Menu.find().sort({ sortOrder: 1 });
        res.json(menus);
    } catch (err) {
        res.status(500).send(err.message);
    }
};

exports.getUsedSortOrders = async (req, res) => {
    try {
        // Use Mongoose distinct method to fetch unique sortOrder values
        const usedSortOrders = await Menu.find().distinct("sortOrder");

        // Send response
        res.status(200).json({ sortOrders: usedSortOrders });
    } catch (err) {
        // Handle errors
        res.status(500).json({ message: "Server error", error: err.message });
    }
};

// Create a new menu item
exports.createMenu = async (req, res) => {
    try {
        const { name, link, sortOrder, meta_data, content } = req.body;

        // Check if sortOrder already exists
        const existingMenu = await Menu.findOne({ sortOrder });
        if (existingMenu) {
            return res.status(400).json({ message: "Sort order must be unique." });
        }

        // Create new menu
        const newMenu = new Menu({ name, link, sortOrder, meta_data, content });
        await newMenu.save();

        res.status(201).json(newMenu);
    } catch (err) {
        res.status(500).json({ message: "Server error", error: err.message });
    }
};

exports.updateMenu = async (req, res) => {
    try {
        const { id } = req.params;
        const { sortOrder, name, link, meta_data, content } = req.body;

        // Check if another menu item already has the same sortOrder
        const existingMenu = await Menu.findOne({ sortOrder, _id: { $ne: id } });
        if (existingMenu) {
            return res.status(400).json({ message: "Sort order must be unique." });
        }

        // Update the menu item
        const updatedMenu = await Menu.findByIdAndUpdate(
            id,
            { name, link, sortOrder, meta_data, content },
            { new: true, runValidators: true } // Enforce schema validation and return 
        );

        if (!updatedMenu) {
            return res.status(404).json({ message: "Menu not found." });
        }

        res.status(200).json(updatedMenu);
    } catch (err) {
        res.status(500).json({ message: "Server error", error: err.message });
    }
};

// Delete a menu item
exports.deleteMenu = async (req, res) => {
    try {
        await Menu.findByIdAndDelete(req.params.id);
        res.json({ message: "Menu deleted" });
    } catch (err) {
        res.status(500).send(err.message);
    }
};
