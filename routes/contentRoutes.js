const express = require("express");
const {
    getAllContent,
    getContentBySlug,
    createContent,
    updateContent,
    deleteContent,
} = require("../controllers/contentController.js");

const router = express.Router();

router.get("/", getAllContent);
router.get("/:slug", getContentBySlug);
router.post("/", createContent);
router.put("/:slug", updateContent);
router.delete("/:slug", deleteContent);

module.exports = router;
