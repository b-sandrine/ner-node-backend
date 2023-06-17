const express = require('express')
const {addOwner, getOwners} = require('../controllers/owner.controller')

const router = express.Router();
const { verifyToken } = require('../auth/authMiddleware');

/**
 * @swagger
 * /api/owners/create:
 *   post:
 *     summary: Create Owner
 *     description: Creating a new car owner
 *     responses:
 *       '201':
 *         description: Owner Created
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Owner'
 * /api/owners/list:
 *   get:
 *     summary: Get all registered owners
 *     description: List of owners who are registered
 *     responses:
 *       '200':
 *         description: List Found
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Owner'
 */
router.post('/create', addOwner);
router.get('/list', getOwners);


module.exports = router;
