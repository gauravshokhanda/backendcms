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

// Create a new menu item
exports.createMenu = async (req, res) => {
    try {
        const newMenu = new Menu(req.body);
        await newMenu.save();
        res.status(201).json(newMenu);
    } catch (err) {
        res.status(500).send(err.message);
    }
};

// Update a menu item
exports.updateMenu = async (req, res) => {
    try {
        const updatedMenu = await Menu.findByIdAndUpdate(req.params.id, req.body, { new: true });
        res.json(updatedMenu);
    } catch (err) {
        res.status(500).send(err.message);
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
