const pool = require('../db');

exports.getAllUsers = async (req, res) => {
    try {
        const users = await pool.query('SELECT id, name, email, role FROM users');
        res.json(users.rows);
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: "Server error" });
    }
};
