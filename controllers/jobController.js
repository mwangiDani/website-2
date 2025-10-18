const pool = require("../db");
const fs = require("fs");

exports.submitJobApplication = async (req, res) => {
  try {
    const userId = req.user.id;
    const { job_title, phone } = req.body;
    const cvFile = req.files.cv ? req.files.cv[0].filename : null;
    const coverLetterFile = req.files.coverLetter ? req.files.coverLetter[0].filename : null;

    if (!cvFile || !coverLetterFile || !phone || !job_title) {
      return res.status(400).json({ success: false, message: "All fields are required" });
    }

    const result = await pool.query(
      "INSERT INTO job_applications (user_id, job_title, phone, cv, cover_letter, status, created_at) VALUES ($1, $2, $3, $4, $5, $6, NOW()) RETURNING *",
      [userId, job_title, phone, cvFile, coverLetterFile, "Pending"]
    );

    res.json({ success: true, application: result.rows[0] });
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, message: "Server error submitting application" });
  }
};

exports.getJobApplications = async (req, res) => {
  try {
    const userId = req.user.id;

    const result = await pool.query(
      "SELECT * FROM job_applications WHERE user_id=$1 ORDER BY created_at DESC",
      [userId]
    );

    res.json({ success: true, applications: result.rows });
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, message: "Server error fetching applications" });
  }
};
