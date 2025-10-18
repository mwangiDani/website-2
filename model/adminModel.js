const pool = require('../db');

const Admin = {
    getAllUsers: async () => {
        const result = await pool.query('SELECT id, name, email, role FROM users');
        return result.rows;
    }
};

module.exports = Admin;
