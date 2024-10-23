const express = require('express');
const { getMessages, createMessage, searchMessages} = require('../controllers/messageController');
const router = express.Router();

router.get('/', getMessages);      // GET all messages
router.post('/', createMessage);   // POST a new message
router.get('/searchMessages', searchMessages);


module.exports = router;
