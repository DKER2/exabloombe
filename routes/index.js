// /routes/index.js
const express = require('express');
const contactsRouter = require('./contacts');
const messagesRouter = require('./messages');
const conversationRouter = require('./conversations');

const router = express.Router();

router.use('/contacts', contactsRouter);
router.use('/messages', messagesRouter);
router.use('/conversations', conversationRouter);

module.exports = router;
