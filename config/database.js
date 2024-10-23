// /config/database.js
const { Sequelize } = require('sequelize');
require('dotenv').config(); // Load environment variables from .env

const sequelize = new Sequelize(
    process.env.DB_NAME,
    process.env.DB_USER,
    process.env.DB_PASSWORD,
    {
        host: process.env.DB_HOST,
        dialect: 'postgres',
        logging: false, // Disable SQL query logging (optional)
    }
);

module.exports = sequelize;
