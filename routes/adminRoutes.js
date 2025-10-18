const express = require("express");
const router = express.Router();
const { authMiddleware } = require("../middleware/authMiddleware");
const { getAllUsers } = require("../controllers/adminController");

// Protect all admin routes
router.use(authMiddleware);

// Admin-specific routes
router.get("/users", getAllUsers);

module.exports = router;
