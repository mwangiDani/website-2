const express = require("express");
const router = express.Router();
const multer = require("multer");
const { authMiddleware } = require("../middleware/authMiddleware");
const { submitJobApplication, getJobApplications } = require("../controllers/jobController");

// Setup multer for file uploads
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "uploads/"); // Make sure this folder exists
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + "-" + file.originalname);
  },
});
const upload = multer({ storage: storage });

// Protect all job routes
router.use(authMiddleware);

// Submit job application with CV and Cover Letter
router.post(
  "/",
  upload.fields([
    { name: "cv", maxCount: 1 },
    { name: "coverLetter", maxCount: 1 },
  ]),
  submitJobApplication
);

// Get job applications for logged-in user
router.get("/", getJobApplications);

module.exports = router;
