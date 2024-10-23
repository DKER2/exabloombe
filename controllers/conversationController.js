const { Message, Contact} = require('../models');
const Sequelize = require('sequelize');

const getConversations = async (req, res) => {
    const { page = 1, limit = 50 } = req.body;

    const offset = (page - 1) * limit;

    try {
        const conversations = await Message.findAll({
            attributes: ['contact_id', 'content', 'created_at'],
            where: {
                [Sequelize.Op.and]: [
                    Sequelize.literal(`
                    (contact_id, created_at) IN (
                      SELECT contact_id, MAX(created_at) as max_created_at
                      FROM messages
                      GROUP BY contact_id
                      ORDER BY max_created_at DESC
                      LIMIT ${limit} OFFSET ${offset}
                    )
                  `)]
            },
            order: [['created_at', 'DESC']],
            raw: true,
        });
        res.json(conversations);
    } catch (error) {
        res.status(500).json({ error: 'Failed to fetch messages' });
    }
};

module.exports = {getConversations}
