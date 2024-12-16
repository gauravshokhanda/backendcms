const Blog = require("../models/Blog.js");

require("dotenv").config();

// Create a blog
const BASE_URL = process.env.BASE_URL; // Define base URL

console.log(BASE_URL);
exports.createBlog = async (req, res) => {
  try {
    const { title, content, author, tags, published = "No", slug } = req.body;
    const image = req.file
      ? `${BASE_URL}/${req.file.path.replace(/\\/g, "/")}`
      : null;

    if (!["Yes", "No"].includes(published)) {
      return res
        .status(400)
        .json({ success: false, message: "Invalid value for published field" });
    }

    const generateSlug = (title) => {
      return title
        .toLowerCase()
        .trim()
        .replace(/[^a-z0-9\s-]/g, "") // Remove special characters
        .replace(/\s+/g, "-"); // Replace spaces with hyphens
    };
    const generatedSlug = slug || generateSlug(title);
    const blog = new Blog({
      title,
      content,
      author,
      tags,
      published,
      image,
      slug: generatedSlug,
    });

    await blog.save();
    res.status(201).json({ success: true, data: blog });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
};

exports.updateBlog = async (req, res) => {
  try {
    const { title, content, author, tags, published, slug } = req.body;
    const image = req.file
      ? `${BASE_URL}/${req.file.path.replace(/\\/g, "/")}`
      : undefined;

    const updatedData = {
      title,
      content,
      author,
      tags,
    };

    if (image) updatedData.image = image;

    if (published) {
      if (!["Yes", "No"].includes(published)) {
        return res.status(400).json({
          success: false,
          message: "Invalid value for published field",
        });
      }
      updatedData.published = published;
    }
    const generateSlug = (title) => {
      return title
        .toLowerCase()
        .trim()
        .replace(/[^a-z0-9\s-]/g, "")
        .replace(/\s+/g, "-");
    };

    if (title) {
      updatedData.slug = slug || generateSlug(title);
    }

    const blog = await Blog.findByIdAndUpdate(req.params.id, updatedData, {
      new: true,
      runValidators: true,
    });

    if (!blog) {
      return res
        .status(404)
        .json({ success: false, message: "Blog not found" });
    }

    res.status(200).json({ success: true, data: blog });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
};

exports.togglePublishStatus = async (req, res) => {
  try {
    const { id } = req.params;
    const { publish } = req.body;

    if (!["Yes", "No"].includes(publish)) {
      return res
        .status(400)
        .json({ success: false, message: "Invalid value for publish field" });
    }

    const blog = await Blog.findByIdAndUpdate(
      id,
      { published: publish },
      { new: true }
    );

    if (!blog) {
      return res
        .status(404)
        .json({ success: false, message: "Blog not found" });
    }

    res.status(200).json({
      success: true,
      message: `Blog has been ${publish === "Yes" ? "published" : "unpublished"
        }`,
      data: blog,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error updating publish status",
      error,
    });
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
      return res
        .status(404)
        .json({ success: false, message: "Blog not found" });
    }
    res.status(200).json({ success: true, data: blog });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

exports.getBlogBySlug = async (req, res) => {
  try {
    const { slug } = req.params;
    const blog = await Blog.findOne({ slug });
    if (!blog) {
      return res
        .status(404)
        .json({ success: false, message: "Blog not found" });
    }
    res.status(200).json({ success: true, data: blog });
  }
  catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }

}

// Delete a blog
exports.deleteBlog = async (req, res) => {
  try {
    const blog = await Blog.findByIdAndDelete(req.params.id);
    if (!blog) {
      return res
        .status(404)
        .json({ success: false, message: "Blog not found" });
    }
    res.status(200).json({ success: true, message: "Blog deleted" });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};
