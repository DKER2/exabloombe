// /models/index.js
const sequelize = require('../config/database');
const Contact = require('./contact');
const Message = require('./message');

// Sync models with the database
(async () => {
    try {
        await sequelize.sync({ force: false }); // Use { force: true } for development (drops and recreates tables)
        console.log('Database synchronized.');
    } catch (error) {
        console.error('Database synchronization failed:', error);
    }
})();

module.exports = { sequelize, Contact, Message };
