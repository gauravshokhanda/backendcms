const mongoose = require("mongoose");

const contentSchema = new mongoose.Schema({
    slug: { type: String, unique: true, required: true },
    body: { type: String, required: true },
    status: { type: String, enum: ["Active", "Inactive"], default: "Active" },
    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model("Content", contentSchema);
