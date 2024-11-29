const Setting = require("../models/setting.js");

// Create a new Setting
exports.createSetting = async (req, res) => {
    try {
        const setting = new Setting(req.body);
        const savedSetting = await setting.save();
        res.status(201).json(savedSetting);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

// Get all Setting
exports.getAllSetting = async (req, res) => {
    try {
        const setting = await Setting.find();
        res.status(200).json(setting);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Get a single Setting by ID
exports.getSettingById = async (req, res) => {
    try {
        const setting = await Setting.findById(req.params.id);
        if (!setting) return res.status(404).json({ message: "Setting not found" });
        res.status(200).json(setting);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Update a Setting by ID
exports.updateSettingById = async (req, res) => {
    try {
        const updatedSetting = await Setting.findByIdAndUpdate(req.params.id, req.body, {
            new: true,
            runValidators: true,
        });
        if (!updatedSetting) return res.status(404).json({ message: "Setting not found" });
        res.status(200).json(updatedSetting);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

// Delete a Setting by ID
exports.deleteSettingById = async (req, res) => {
    try {
        const deletedSetting = await Setting.findByIdAndDelete(req.params.id);
        if (!deletedSetting) return res.status(404).json({ message: "Setting not found" });
        res.status(200).json({ message: "Setting deleted successfully" });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};
