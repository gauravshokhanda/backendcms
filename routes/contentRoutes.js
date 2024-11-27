const express = require("express");
const {
    getAllContent,
    getContentBySlug,
    createContent,
    updateContent,
    deleteContent,
} = require("../controllers/contentController.js");
const authenticate = require("../middleware/authenticate.js");


const router = express.Router();

router.get("/", getAllContent);
router.get("/:slug", getContentBySlug);
router.post("/", authenticate, createContent);
router.put("/:slug", authenticate, updateContent);
router.delete("/:slug", authenticate, deleteContent);

module.exports = router;
