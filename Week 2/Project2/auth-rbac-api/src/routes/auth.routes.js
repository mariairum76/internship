const express = require('express');

const router = express.Router();

const validate = require('../middleware/validate');
const authController = require('../controllers/auth.controller');

const {
  registerSchema,
  loginSchema,
  refreshSchema
} = require('../schemas/auth.schema');

/**
 * @swagger
 * /api/v1/auth/register:
 *   post:
 *     summary: Register user
 *     tags:
 *       - Auth
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *               email:
 *                 type: string
 *               password:
 *                 type: string
 *     responses:
 *       201:
 *         description: User created
 */
router.post(
  '/register',
  validate(registerSchema),
  authController.register
);

/**
 * @swagger
 * /api/v1/auth/login:
 *   post:
 *     summary: Login user
 *     tags:
 *       - Auth
 *     requestBody:
 *       required: true
 *     responses:
 *       200:
 *         description: Login success
 */
router.post(
  '/login',
  validate(loginSchema),
  authController.login
);

/**
 * @swagger
 * /api/v1/auth/refresh:
 *   post:
 *     summary: Refresh token
 *     tags:
 *       - Auth
 *     responses:
 *       200:
 *         description: Token refreshed
 */
router.post(
  '/refresh',
  validate(refreshSchema),
  authController.refresh
);

module.exports = router;