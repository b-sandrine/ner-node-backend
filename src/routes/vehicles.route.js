const express = require('express')
const router = express.Router();

const {authUser} = require('../auth/authMiddleware');
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

router.post('/create', addVehicles )
router.get('/list', getVehicles);

module.exports = router;