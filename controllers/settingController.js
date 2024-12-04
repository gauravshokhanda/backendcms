const Setting = require("../models/setting.js");
require("dotenv").config();
const path = require("path");
const fs = require("fs");

// Create a new Setting
exports.createSetting = async (req, res) => {
  try {
    const BASE_URL = process.env.BASE_URL || "http://localhost:5000";

    // Handle file upload for logo
    const logo = req.file
      ? `${BASE_URL}/${req.file.path.replace(/\\/g, "/")}`
      : null;

    const setting = new Setting({
      ...req.body,
      logo, // Add the logo to the setting
    });

    // Save the setting to the database
    const savedSetting = await setting.save();

    res.status(201).json({ success: true, data: savedSetting });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
};

// Get all Settings
exports.getAllSetting = async (req, res) => {
  try {
    const settings = await Setting.find();
    res.status(200).json(settings);
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
    let updateData = req.body;

    // If a new logo is uploaded, update the logo field
    if (req.file) {
      const logoPath = `${
        process.env.BASE_URL || "http://localhost:5000"
      }/uploads/${req.file.filename}`;

      updateData.logo = logoPath;

      // Optionally, delete the old logo file if it's being replaced
      const setting = await Setting.findById(req.params.id);
      if (setting && setting.logo) {
        const oldPath = path.join(__dirname, "..", setting.logo);
        if (fs.existsSync(oldPath)) fs.unlinkSync(oldPath);
      }
    }

    const updatedSetting = await Setting.findByIdAndUpdate(
      req.params.id,
      updateData,
      {
        new: true,
        runValidators: true,
      }
    );

    if (!updatedSetting)
      return res.status(404).json({ message: "Setting not found" });
    res.status(200).json(updatedSetting);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Delete a Setting by ID
exports.deleteSettingById = async (req, res) => {
  try {
    const setting = await Setting.findById(req.params.id);

    // Optionally, delete the associated logo file
    if (setting && setting.logo) {
      const oldPath = path.join(__dirname, "..", setting.logo);
      if (fs.existsSync(oldPath)) fs.unlinkSync(oldPath);
    }

    const deletedSetting = await Setting.findByIdAndDelete(req.params.id);
    if (!deletedSetting)
      return res.status(404).json({ message: "Setting not found" });
    res.status(200).json({ message: "Setting deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
