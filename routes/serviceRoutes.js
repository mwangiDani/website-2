const express = require("express");
const router = express.Router();
const { authMiddleware } = require("../middleware/authMiddleware");
const { createService, getServices } = require("../controllers/serviceController");

// Protect all service routes
router.use(authMiddleware);

router.post("/", createService);
router.get("/", getServices);

module.exports = router;
