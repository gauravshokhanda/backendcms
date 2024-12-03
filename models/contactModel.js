const mongoose = require("mongoose");

const contactSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true },
    number: { type: String, required: true },
    find_us: { type: String, required: true },
    message: { type: String, required: true },
    newsletter: { type: Boolean, default: false },
    resolved: { type: Boolean, default: false },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Contact", contactSchema);
