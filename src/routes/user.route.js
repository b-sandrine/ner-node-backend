const express = require('express')
const {addUser, login, welcome} = require('../controllers/user.controller')

const router = express.Router();
const verifyToken = require('../auth/authMiddleware')

router.post('/create', addUser);
router.post('/login', login)
router.get('/welcome',verifyToken,welcome)

module.exports = router;
