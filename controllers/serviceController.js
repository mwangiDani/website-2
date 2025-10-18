// controllers/serviceController.js

// Example function
const getServices = (req, res) => {
    // logic to fetch services from database
    res.json({ message: "All services fetched" });
};

const createService = (req, res) => {
    // logic to create a new service
    res.json({ message: "Service created" });
};

module.exports = { getServices, createService };
