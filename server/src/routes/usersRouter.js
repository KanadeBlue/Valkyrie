const express = require('express');
const router = express.Router();

const { authenticate } = require('../middleware/authMiddleware');
const { register, getMe, getUser, getUserFriends } = require('../controllers/usersController');

router.post('/', register);
router.get('/@me', authenticate, getMe);
router.get('/:UserID', authenticate, getUser);

router.get('/:UserID/friends', authenticate, getUserFriends);

module.exports = router;