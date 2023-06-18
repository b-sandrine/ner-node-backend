const express = require('express')
const {addOwner, getOwners, updateOwner, deleteOwner} = require('../controllers/owner.controller')

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
router.post('/create', verifyToken, addOwner);
router.get('/list', verifyToken, getOwners);
router.put('/update/:id', verifyToken, updateOwner)
router.delete('/delete/:id',verifyToken,deleteOwner)

module.exports = router;
