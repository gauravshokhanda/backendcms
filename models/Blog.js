const mongoose = require("mongoose");

const blogSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
        trim: true,
    },
    content: {
        type: String,
        required: true,
    },
    author: {
        type: String,
        required: true,
    },
    tags: [String],
    published: {
        type: String, // "Yes" or "No"
        enum: ["Yes", "No"], // Ensure only these values are allowed
        default: "No", // Default to "No"
    },
    image: {
        type: String, // Path to image
        default: null,
    },
}, { timestamps: true });

module.exports = mongoose.model("Blog", blogSchema);
