const express = require('express')
const {addUser, login, welcome} = require('../controllers/user.controller')

const router = express.Router();
const { verifyToken } = require('../auth/authMiddleware');

/**
 * @swagger
 * /api/users/create:
 *   post:
 *     summary: Create User
 *     description: Creating a new user account
 *     responses:
 *       '201':
 *         description: User Created
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/User'
 * /api/users/login:
 *   post:
 *     summary: Sign in User Account
 *     description: Accessing an existing user account
 *     responses:
 *       '200':
 *         description: User Found
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/User'
 */
router.post('/create', addUser);
router.post('/login', login)
router.get('/welcome',verifyToken,welcome)

module.exports = router;
