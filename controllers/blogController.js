const Blog = require("../models/Blog.js");

// import Blog, { find, findById, findByIdAndUpdate, findByIdAndDelete } from "../models/Blog.js";

// Create a blog
exports.createBlog = async (req, res) => {
    try {
        const blog = new Blog(req.body);
        await blog.save();
        res.status(201).json({ success: true, data: blog });
    } catch (error) {
        res.status(400).json({ success: false, message: error.message });
    }
};

// Get all blogs
exports.getAllBlogs = async (req, res) => {
    try {
        const blogs = await Blog.find();
        res.status(200).json({ success: true, data: blogs });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

// Get a single blog by ID
exports.getBlogById = async (req, res) => {
    try {
        const blog = await Blog.findById(req.params.id);
        if (!blog) {
            return res.status(404).json({ success: false, message: "Blog not found" });
        }
        res.status(200).json({ success: true, data: blog });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

// Update a blog
exports.updateBlog = async (req, res) => {
    try {
        const blog = await Blog.findByIdAndUpdate(req.params.id, req.body, {
            new: true,
            runValidators: true,
        });
        if (!blog) {
            return res.status(404).json({ success: false, message: "Blog not found" });
        }
        res.status(200).json({ success: true, data: blog });
    } catch (error) {
        res.status(400).json({ success: false, message: error.message });
    }
};

// Delete a blog
exports.deleteBlog = async (req, res) => {
    try {
        const blog = await Blog.findByIdAndDelete(req.params.id);
        if (!blog) {
            return res.status(404).json({ success: false, message: "Blog not found" });
        }
        res.status(200).json({ success: true, message: "Blog deleted" });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};
