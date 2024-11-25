const express = require("express");
const {
    createBlog,
    getAllBlogs,
    getBlogById,
    updateBlog,
    deleteBlog,
    togglePublishStatus
} = require("../controllers/blogController.js");
const authenticate = require("../middleware/authenticate.js");
const upload = require("../middleware/upload.js");

const router = express.Router();

router.post("/", authenticate, upload.single("image"), createBlog); // Add image upload
router.get("/", getAllBlogs);
router.get("/:id", getBlogById);
router.put("/:id", authenticate, upload.single("image"), updateBlog); // Allow image update
router.delete("/:id", authenticate, deleteBlog);
router.patch("/:id/publish", authenticate, togglePublishStatus);

module.exports = router;
