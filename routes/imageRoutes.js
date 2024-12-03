const express = require("express");
const router = express.Router();
const multer = require("multer");
const { addImage, updateImage, deleteImage, getImages, getImageById } = require("../controllers/imageController.js");

// Multer setup for file upload
const storage = multer.diskStorage({    
    destination: (req, file, cb) => {
        cb(null, "uploads");
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + "-" + file.originalname);
    },
});

const upload = multer({ storage });

// Routes
router.post("/", upload.single("image"), addImage);
router.put("/:id", upload.single("image"), updateImage);
router.delete("/:id", deleteImage);
router.get("/", getImages);
router.get("/:id", getImageById);


module.exports = router;
