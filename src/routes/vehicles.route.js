const express = require('express')
const router = express.Router();

const {authUser} = require('../auth/authMiddleware');
const { addVehicles } = require('../controllers/vehicles.controller');
 
/**
 * @swagger
 * /api/vehicles/create:
 *   post:
 *     summary: Create product
 *     description: Create a new product by an authenticated user
 *     responses:
 *       '201':
 *         description: Product created
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Product'
 *       '401':
 *         description: Unauthorized
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Product'
 */

router.post('/create',authUser, addVehicles )

module.exports = router;