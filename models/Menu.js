const mongoose = require("mongoose");

const menuSchema = new mongoose.Schema({
    name: { type: String, required: true },
    link: { type: String, required: true },
    sortOrder: { type: Number, default: 0, unique: true, },
});

module.exports = mongoose.model("Menu", menuSchema);
