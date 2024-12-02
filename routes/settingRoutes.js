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
const multer = require("multer");

// Configure multer for file uploads
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, "uploads/"); // Specify the uploads directory
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + "-" + file.originalname); // Generate a unique filename
    },
});

const upload = multer({ storage });

// Routes for handling settings
router.post("/", authenticate, upload.single("logo"), createSetting); // Create a setting with logo upload
router.get("/", getAllSetting); // Get all settings
router.get("/:id", getSettingById); // Get a setting by ID
router.put("/:id", authenticate, upload.single("logo"), updateSettingById); // Update a setting with logo upload
router.delete("/:id", authenticate, deleteSettingById); // Delete a setting

module.exports = router;
