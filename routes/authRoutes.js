const express = require("express");
const { check } = require("express-validator");
const {
  registerUser,
  authUser,
  getUserProfile,
} = require("../controllers/userController");
const { protect } = require("../middleware/authMiddleware");

const router = express.Router();

// User registration
router.post(
  "/register",
  [
    check("name", "Name is required").notEmpty(),
    check("email", "Please include a valid email").isEmail(),
    check("password", "Password must be at least 6 characters").isLength({
      min: 6,
    }),
  ],
  registerUser
);

// User login
router.post("/login", authUser);

// Get user profile (Protected route)
router.get("/profile", protect, getUserProfile);

module.exports = router;
