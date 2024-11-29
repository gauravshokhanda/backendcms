const express = require("express");
const router = express.Router();
const {
    createSetting,
    getAllSetting,
    getSettingById,
    updateSettingById,
    deleteSettingById,
} = require("../controllers/settingController.js");
const authenticate = require("../middleware/authenticate.js");


// Create a new contact
router.post("/", authenticate, createSetting);

// Get all contacts
router.get("/", getAllSetting);

// Get a single contact by ID
router.get("/:id", getSettingById);

// Update a contact by ID
router.put("/:id", authenticate, updateSettingById);

// Delete a contact by ID
router.delete("/:id", authenticate, deleteSettingById);

module.exports = router;
