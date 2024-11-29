const mongoose = require("mongoose");

const settingSchema = new mongoose.Schema({
    logo: { type: String, required: true },
    address: { type: String, required: true },
    script: { type: String },
    contactNumber: { type: String, required: true },
    email: { type: String, required: true },
}, { timestamps: true });

module.exports = mongoose.model("Setting", settingSchema);
