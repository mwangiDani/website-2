const pool = require('../db');

const Service = {
    create: async (name, description) => {
        const result = await pool.query(
            'INSERT INTO services (name, description) VALUES ($1, $2) RETURNING *',
            [name, description]
        );
        return result.rows[0];
    },

    findAll: async () => {
        const result = await pool.query('SELECT * FROM services');
        return result.rows;
    }
};

module.exports = Service;
