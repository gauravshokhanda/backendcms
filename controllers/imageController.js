const Image = require("../models/imageModel");
const path = require("path");
const fs = require("fs");

// Add Image
exports.addImage = async (req, res) => {
  try {
    const { title } = req.body;
    const imageUrl = req.file ? `/uploads/${req.file.filename}` : null;

    if (!title || !imageUrl) {
      return res.status(400).json({ message: "Title and image are required" });
    }

    const newImage = new Image({ title, imageUrl });
    await newImage.save();

    res.status(201).json({ message: "Image added successfully", newImage });
  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
};

// Update Image
exports.updateImage = async (req, res) => {
  try {
    const { id } = req.params;
    const { title } = req.body;
    const image = await Image.findById(id);

    if (!image) {
      return res.status(404).json({ message: "Image not found" });
    }

    // Delete old image if a new file is uploaded
    if (req.file) {
      const oldPath = path.join(__dirname, "../uploads", image.imageUrl.split("/").pop());
      if (fs.existsSync(oldPath)) fs.unlinkSync(oldPath);

      image.imageUrl = `/uploads/${req.file.filename}`;
    }

    if (title) image.title = title;

    await image.save();
    res.status(200).json({ message: "Image updated successfully", image });
  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
};

exports.getImages = async (req, res) => {
  try {
    const images = await Image.find(); // Fetch all images from the database
    res.status(200).json({ message: "Images fetched successfully", images });
  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
};

// Get Image by ID
exports.getImageById = async (req, res) => {
  try {
    const { id } = req.params;
    const image = await Image.findById(id);

    if (!image) {
      return res.status(404).json({ message: "Image not found" });
    }

    res.status(200).json({ message: "Image fetched successfully", image });
  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
};


// Delete Image
exports.deleteImage = async (req, res) => {
  try {
    const { id } = req.params;
    const image = await Image.findById(id);

    if (!image) {
      return res.status(404).json({ message: "Image not found" });
    }

    // Remove image file
    const imagePath = path.join(__dirname, "../uploads", image.imageUrl.split("/").pop());
    if (fs.existsSync(imagePath)) fs.unlinkSync(imagePath);

    await Image.findByIdAndDelete(id);
    res.status(200).json({ message: "Image deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
};
