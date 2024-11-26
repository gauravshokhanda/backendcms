const Content = require("../models/Content.js");

exports.getAllContent = async (req, res) => {
    try {
        const filter = req.query.status ? { status: req.query.status } : {};
        const contents = await Content.find(filter); // Filter by status
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

exports.createContent = async (req, res) => {
    try {
        const {  slug, body, status } = req.body; // Include status
        const newContent = new Content({  slug, body, status });
        await newContent.save();
        res.status(201).json(newContent);
    } catch (err) {
        res.status(500).send(err.message);
    }
};


exports.updateContent = async (req, res) => {
    try {
        const {  body, status } = req.body; // Include status
        const updatedContent = await Content.findOneAndUpdate(
            { slug: req.params.slug },
            {  body, status }, // Update status
            { new: true }
        );
        if (!updatedContent) return res.status(404).send("Content not found");
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
