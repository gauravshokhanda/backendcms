const express = require("express");
const {
    createClient,
    getClients,
    getClient,
    updateClient,
    deleteClient,
} = require("../controllers/clientController.js");

const router = express.Router();

// CRUD routes
router.post("/", createClient);
router.get("/", getClients);
router.get("/:id", getClient);
router.put("/:id", updateClient);
router.delete("/:id", deleteClient);

module.exports = router;
