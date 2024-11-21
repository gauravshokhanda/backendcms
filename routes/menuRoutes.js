const express = require("express");
const {
    getMenus,
    createMenu,
    updateMenu,
    deleteMenu,
} = require("../controllers/menuController.js");

const router = express.Router();

router.get("/", getMenus);
router.post("/", createMenu);
router.put("/:id", updateMenu);
router.delete("/:id", deleteMenu);

module.exports = router;
