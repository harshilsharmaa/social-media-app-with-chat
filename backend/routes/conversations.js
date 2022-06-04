const express = require('express');
const router = express.Router();
const {isAuthenticated} = require('../middleware/auth');
const {newConversation, getConversations, getConversationsOfTwoUser} = require('../controllers/conversations');

router.route('/conversation').post(isAuthenticated, newConversation);
router.route('/conversation/:userId').get(isAuthenticated, getConversations);
router.route('/conversation/:firstUserId/:SecondUserId').get(isAuthenticated, getConversationsOfTwoUser);

module.exports = router;