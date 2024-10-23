const express = require('express');
const { getContacts, createContact } = require('../controllers/contactController');
const router = express.Router();

router.get('/', getContacts);      // GET all contacts
router.post('/', createContact);   // POST a new contact

module.exports = router;
