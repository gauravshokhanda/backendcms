const express = require("express");
const {
    createBlog,
    getAllBlogs,
    getBlogById,
    updateBlog,
    deleteBlog,
    togglePublishStatus,
    getBlogBySlug
} = require("../controllers/blogController.js");
const authenticate = require("../middleware/authenticate.js");
const upload = require("../middleware/upload.js");

const router = express.Router();

router.post("/", authenticate, upload.single("image"), createBlog);
router.get("/", getAllBlogs);
router.get("/:id", getBlogById);
router.get("/slug/:slug", getBlogBySlug);
router.put("/:id", authenticate, upload.single("image"), updateBlog);
router.delete("/:id", authenticate, deleteBlog);
router.patch("/:id/publish", authenticate, togglePublishStatus);

module.exports = router;
