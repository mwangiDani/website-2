const pool = require('../db');

const createServiceRequest = async (user_id, title, description) => {
    const result = await pool.query(
        'INSERT INTO service_requests (user_id, title, description) VALUES ($1, $2, $3) RETURNING *',
        [user_id, title, description]
    );
    return result.rows[0];
};

const getUserRequests = async (user_id) => {
    const result = await pool.query(
        'SELECT * FROM service_requests WHERE user_id=$1',
        [user_id]
    );
    return result.rows;
};

const getAllRequests = async () => {
    const result = await pool.query('SELECT * FROM service_requests');
    return result.rows;
};

const updateRequestStatus = async (id, status) => {
    const result = await pool.query(
        'UPDATE service_requests SET status=$1, updated_at=NOW() WHERE id=$2 RETURNING *',
        [status, id]
    );
    return result.rows[0];
};

module.exports = {
    createServiceRequest,
    getUserRequests,
    getAllRequests,
    updateRequestStatus
};
