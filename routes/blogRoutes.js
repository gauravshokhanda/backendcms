const express = require("express");
const {
    createBlog,
    getAllBlogs,
    getBlogById,
    updateBlog,
    deleteBlog
} = require("../controllers/blogController.js");
const authenticate = require("../middleware/authenticate.js");

const router = express.Router();


router.post("/", authenticate, createBlog); // Only authenticated users can create blogs
router.get("/", getAllBlogs);
router.get("/:id", getBlogById);
router.put("/:id", authenticate, updateBlog); // Only authenticated users can update
router.delete("/:id", authenticate, deleteBlog); // Only authenticated users can delete 

module.exports = router;
