const express = require('express')
const {addUser} = require('../controllers/user.controller')

const router = express.Router();

router.post('/create', addUser);

module.exports = router;
