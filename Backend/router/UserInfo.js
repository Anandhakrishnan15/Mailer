const express = require("express");
const { getUserInfo } = require("../controllers/UserController");
const protect = require("../middleware/authMiddleware");

const router = express.Router();

// @desc    Get logged-in user's data
// @route   GET /api/users/profile
// @access  Private
router.get("/profile", protect, getUserInfo);

module.exports = router;