const express = require('express');
const router = express.Router();
const {isAuthenticated} = require('../middleware/auth');
const {newMessage, getMessages} = require('../controllers/messages');

router.route('/newmessage').post(isAuthenticated, newMessage);
router.route('/message/:conversationId').get(isAuthenticated, getMessages);

module.exports = router;