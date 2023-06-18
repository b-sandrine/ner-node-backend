const express = require('express')
const router = express.Router();

const {verifyToken} = require('../auth/authMiddleware');
const { addVehicles, getVehicles } = require('../controllers/vehicles.controller');
 
/**
 * @swagger
 * /api/vehicles/create:
 *   post:
 *     summary: Create Vehicle
 *     description: Create a new Vehicl by an authenticated user
 *     responses:
 *       '201':
 *         description: Vehicle registered
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Vehicle'
 *       '401':
 *         description: Unauthorized
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Vehicle'
 */

router.post('/create',verifyToken, addVehicles )
router.get('/list',verifyToken, getVehicles);

module.exports = router;