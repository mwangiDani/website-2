const express = require("express");
const router = express.Router();
const { authMiddleware } = require("../middleware/authMiddleware");
const { createRequest, getRequests, updateRequest } = require("../controllers/requestController");

// Protect all request routes
router.use(authMiddleware);

router.post("/", createRequest);
router.get("/", getRequests);
router.put("/:id", updateRequest);

module.exports = router;
