const Client = require("../models/clientModel.js");

// Create a new client
exports.createClient = async (req, res) => {
    try {
        const client = new Client(req.body);
        await client.save();
        res.status(201).json(client);
    } catch (err) {
        if (err.code === 11000) {
            res.status(400).json({ error: "Email already exists. Please use a different email." });
        } else {
            res.status(400).json({ error: err.message });
        }
    }
};

// Get all clients
exports.getClients = async (req, res) => {
    try {
        const clients = await Client.find();
        res.status(200).json(clients);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

// Get a single client
exports.getClient = async (req, res) => {
    try {
        const client = await Client.findById(req.params.id);
        if (!client) return res.status(404).json({ message: "Client not found" });
        res.status(200).json(client);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

// Update a client
exports.updateClient = async (req, res) => {
    try {
        const client = await Client.findByIdAndUpdate(req.params.id, req.body, {
            new: true,
        });
        if (!client) return res.status(404).json({ message: "Client not found" });
        res.status(200).json(client);
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
};

// Delete a client
exports.deleteClient = async (req, res) => {
    try {
        const client = await Client.findByIdAndDelete(req.params.id);
        if (!client) return res.status(404).json({ message: "Client not found" });
        res.status(200).json({ message: "Client deleted successfully" });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};
