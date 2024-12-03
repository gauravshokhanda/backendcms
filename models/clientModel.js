const mongoose = require("mongoose");

const clientSchema = new mongoose.Schema(
    {
        firstName: { type: String, required: true },
        lastName: { type: String, required: true },
        email: { type: String, required: true, unique: true },
        phoneNumber: { type: String, required: true },
    },
    { timestamps: true }
);

const Client = mongoose.model("Client", clientSchema);

module.exports = Client;
