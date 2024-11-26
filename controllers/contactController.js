const Contact = require("../models/contactModel.js");

// Submit Contact Form
exports.submitContactForm = async (req, res) => {
    try {
        const { name, email, number, subject, message } = req.body;

        // Validate request
        if (!name || !email || !number || !subject || !message) {
            return res.status(400).json({ error: "All fields are required." });
        }

        // Create new contact document
        const newContact = new Contact({ name, email, number, subject, message });
        await newContact.save();

        res.status(201).json({ message: "Contact form submitted successfully." });
    } catch (error) {
        res.status(500).json({ error: "Server error. Please try again later." });
    }
};

// Get All Submitted Forms (Optional)
exports.getAllContacts = async (req, res) => {
    try {
        const contacts = await Contact.find().sort({ createdAt: -1 });
        res.status(200).json(contacts);
    } catch (error) {
        res.status(500).json({ error: "Server error. Please try again later." });
    }
};

// Update Contact Form
exports.updateContactForm = async (req, res) => {
    try {
        const { id } = req.params;
        const { name, email, number, subject, message } = req.body;

        // Validate request
        if (!name || !email || !number || !subject || !message) {
            return res.status(400).json({ error: "All fields are required." });
        }

        // Update contact document
        const updatedContact = await Contact.findByIdAndUpdate(
            id,
            { name, email, number, subject, message },
            { new: true, runValidators: true }
        );

        if (!updatedContact) {
            return res.status(404).json({ error: "Contact not found." });
        }

        res.status(200).json({ message: "Contact updated successfully.", updatedContact });
    } catch (error) {
        res.status(500).json({ error: "Server error. Please try again later." });
    }
};

// Delete Contact Form
exports.deleteContactForm = async (req, res) => {
    try {
        const { id } = req.params;

        const deletedContact = await Contact.findByIdAndDelete(id);

        if (!deletedContact) {
            return res.status(404).json({ error: "Contact not found." });
        }

        res.status(200).json({ message: "Contact deleted successfully." });
    } catch (error) {
        res.status(500).json({ error: "Server error. Please try again later." });
    }
};

// Get a single contact by ID
exports.getContactById = async (req, res) => {
    try {
        const { id } = req.params;

        // Find contact by ID
        const contact = await Contact.findById(id);

        if (!contact) {
            return res.status(404).json({ error: "Contact not found." });
        }

        res.status(200).json(contact);
    } catch (error) {
        res.status(500).json({ error: "Server error. Please try again later." });
    }
};


