const express = require("express");
const router = express.Router();
const authController = require("../controller/authController");

/**
 * @swagger
 * /auth/register/:
 *  post:
 *    tags:
 *      - Auth
 *    description: Untuk User melakukan pendaftaran
 *    security:
 *      - bearerAuth: []
 *    parameters:
 *      - $ref: '/:id'
 *    requestBody:
 *      content:
 *        application/json:
 *          schema:
 *            type: object
 *            properties:
 *               name:
 *                 type: string
 *                 description: Nama User
 *               email:
 *                 type: string
 *                 description: Email User
 *               password:
 *                 type: string
 *                 description: Password User
 *               role:
 *                 type: string
 *                 description: Role User
 *    responses:
 *      200:
 *        description: Berhasil Register
 *      500:
 *        description: Gagal Register
 */
router.post("/register", authController.register); //register

/**
 * @swagger
 * /auth/login/:
 *  post:
 *    tags:
 *      - Auth
 *    description: Untuk User melakukan login
 *    security:
 *      - bearerAuth: []
 *    requestBody:
 *      content:
 *        application/json:
 *          schema:
 *            type: object
 *            properties:
 *               email:
 *                 type: string
 *                 description: Email User
 *               password:
 *                 type: string
 *                 description: Password User
 *    responses:
 *      200:
 *        description: Berhasil Login
 *      500:
 *        description: Gagal Login
 */

router.post("/login", authController.login); //login

/**
 * @swagger
 * /auth/refresh-token/:
 *  post:
 *    tags:
 *      - Auth
 *    description: Untuk User refresh token
 *    security:
 *      - bearerAuth: []
 *    requestBody:
 *      content:
 *        application/json:
 *          schema:
 *            type: object
 *            properties:
 *               refreshToken:
 *                 type: string
 *                 description: Refresh Token User
 *    responses:
 *      200:
 *        description: refresh token berhasil
 *      500:
 *        description: Gagal refresh token
 */

router.post("/refresh-token", authController.refreshToken); //refresh token

module.exports = router;
