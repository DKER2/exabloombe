const express = require('express');
const { getConversations } = require('../controllers/conversationController');
const router = express.Router();

router.get('/', getConversations);      // GET all contacts

module.exports = router;
