const Content = require("../models/Content.js");

// Get all content
exports.getAllContent = async (req, res) => {
    try {
        const contents = await Content.find();
        res.json(contents);
    } catch (err) {
        res.status(500).send(err.message);
    }
};

// Get content by slug
exports.getContentBySlug = async (req, res) => {
    try {
        const content = await Content.findOne({ slug: req.params.slug });
        if (!content) return res.status(404).send("Content not found");
        res.json(content);
    } catch (err) {
        res.status(500).send(err.message);
    }
};

// Create new content
exports.createContent = async (req, res) => {
    try {
        const newContent = new Content(req.body);
        await newContent.save();
        res.status(201).json(newContent);
    } catch (err) {
        res.status(500).send(err.message);
    }
};

// Update content
exports.updateContent = async (req, res) => {
    try {
        const updatedContent = await Content.findOneAndUpdate({ slug: req.params.slug }, req.body, {
            new: true,
        });
        res.json(updatedContent);
    } catch (err) {
        res.status(500).send(err.message);
    }
};

// Delete content
exports.deleteContent = async (req, res) => {
    try {
        await Content.findOneAndDelete({ slug: req.params.slug });
        res.json({ message: "Content deleted" });
    } catch (err) {
        res.status(500).send(err.message);
    }
};
