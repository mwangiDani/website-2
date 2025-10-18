const pool = require('../db');

// Create a new service request
exports.createRequest = async (req, res) => {
    const userId = req.user.id;
    const { title, description } = req.body; // match table column

    try {
        const result = await pool.query(
            'INSERT INTO service_requests (user_id, title, description, status, created_at) VALUES ($1, $2, $3, $4, NOW()) RETURNING *',
            [userId, title, description, 'Pending']
        );
        res.status(201).json({ success: true, request: result.rows[0] });
    } catch (err) {
        console.error(err);
        res.status(500).json({ success: false, message: "Server error creating request" });
    }
};

// Get all requests for the logged-in user
exports.getRequests = async (req, res) => {
    const userId = req.user.id;

    try {
        const result = await pool.query(
            'SELECT * FROM service_requests WHERE user_id=$1 ORDER BY created_at DESC',
            [userId]
        );
        res.json({ success: true, requests: result.rows });
    } catch (err) {
        console.error(err);
        res.status(500).json({ success: false, message: "Server error fetching requests" });
    }
};

// Update request status
exports.updateRequest = async (req, res) => {
    const requestId = req.params.id;
    const { status } = req.body;

    try {
        const result = await pool.query(
            'UPDATE service_requests SET status=$1, updated_at=NOW() WHERE id=$2 RETURNING *',
            [status, requestId]
        );
        res.json({ success: true, request: result.rows[0] });
    } catch (err) {
        console.error(err);
        res.status(500).json({ success: false, message: "Server error updating request" });
    }
};
