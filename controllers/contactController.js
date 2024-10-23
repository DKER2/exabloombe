const { Contact } = require('../models');
const Sequelize = require("sequelize");

const getContacts = async (req, res) => {
    try {
        const contacts = await Contact.findAll();
        res.json(contacts);
    } catch (error) {
        res.status(500).json({ error: error });
    }
};

const createContact = async (req, res) => {
    const { name, phone_number } = req.body;
    try {
        const contact = await Contact.create({ name, phone_number });
        res.status(201).json(contact);
    } catch (error) {
        res.status(500).json({ error: 'Failed to create contact' });
    }
};

const getFilteredContacts = async (contactPhonePattern, contactNamePattern) => {
    const contactWhereClause = {
        [Sequelize.Op.and]: []
    };
    if (contactPhonePattern) {
        contactWhereClause[Sequelize.Op.and].push({
            phone_number: { [Sequelize.Op.like]: `%${contactPhonePattern}%` }
        });
    }
    if (contactNamePattern) {
        contactWhereClause[Sequelize.Op.and].push({
            contact_name: { [Sequelize.Op.like]: `%${contactNamePattern}%` }
        });
    }

    const contactIds = await Contact.findAll({
        attributes: ['id'],
        where: contactWhereClause[Sequelize.Op.and].length > 0 ? contactWhereClause : undefined,
        raw: true,
    });

    return contactIds
}

module.exports = { getContacts, createContact, getFilteredContacts };
