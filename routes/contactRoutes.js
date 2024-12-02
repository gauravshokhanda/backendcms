const express = require("express");
const { submitContactForm, getAllContacts, updateContactForm, deleteContactForm, getContactById } = require("../controllers/contactController.js");
const authenticate = require("../middleware/authenticate.js");


const router = express.Router();

// Route to submit the contact form
router.post("/", submitContactForm);

// Optional: Route to get all submitted forms
router.get("/", getAllContacts);

router.get("/:id", getContactById);

router.put("/:id", updateContactForm);
router.delete("/:id", deleteContactForm);

module.exports = router;
