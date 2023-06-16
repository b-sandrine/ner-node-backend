const express = require('express')
const router = express.Router();

const {addProduct} = require('../controllers/product.controller')
const {authUser} = require('../auth/authMiddleware')
 
/**
 * @swagger
 * /api/products/create:
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

router.post('/create',authUser, addProduct )

module.exports = router;