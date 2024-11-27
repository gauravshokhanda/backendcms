const express = require("express");
const {
    getMenus,
    createMenu,
    updateMenu,
    deleteMenu,
    getUsedSortOrders
} = require("../controllers/menuController.js");
const authenticate = require("../middleware/authenticate.js");

const router = express.Router();

router.get("/", getMenus);
router.get("/used-sort-orders", getUsedSortOrders);
router.post("/", authenticate, createMenu);
router.put("/:id", authenticate, updateMenu);
router.delete("/:id", deleteMenu);

module.exports = router;
