const { Message } = require('../models');
const {getFilteredContacts} = require("./contactController");
const Sequelize = require("sequelize");

const getMessages = async (req, res) => {
    try {
        const messages = await Message.findAll({
            limit: 50
        });
        res.json(messages);
    } catch (error) {
        res.status(500).json({ error: 'Failed to fetch messages' });
    }
};

const createMessage = async (req, res) => {
    const { contact_id, content } = req.body;
    try {
        const message = await Message.create({ contact_id, content });
        res.status(201).json(message);
    } catch (error) {
        res.status(500).json({ error: 'Failed to create message' });
    }
};

const searchMessages = async (req, res) => {
    const { contactNamePattern = null, contactPhonePattern = null, contentPattern = null } = req.body
    try {
        const contactIds = await getFilteredContacts(contactPhonePattern, contactNamePattern)
        const contactIdArray = contactIds.map(contact => contact.id);

        const messageWhereClause = {
            contact_id: {
                [Sequelize.Op.in]: contactIdArray,
            },
        };
        if (contentPattern) {
            messageWhereClause.content = {
                [Sequelize.Op.iLike]: `%${contentPattern}%`
            };
        }

        const messages = await Message.findAll({
            where: messageWhereClause,
            raw: true,
        });

        res.json(messages);
    } catch (error) {
        res.status(500).json({ error: 'Failed to fetch messages' });
    }
}

module.exports = { getMessages, createMessage, searchMessages };
