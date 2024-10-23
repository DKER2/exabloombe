const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const Contact = sequelize.define('contacts', {
    phone_number: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    contact_name: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    created_at: {
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW,
    },
    updated_at: {
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW,
    },
},{
    timestamps: false,
});

module.exports = Contact;
