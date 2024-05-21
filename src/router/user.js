const express = require("express");
const router = express.Router();

const userController = require("../controller/userController");

//middleware
const authMiddleware = require("../middlewares/authMiddleware");
const adminOnly = require("../middlewares/adminOnly");

//CRUD Standard

/**
 * @swagger
 * /users:
 *  get:
 *    tags:
 *      - Users
 *    description: Untuk admin mendapatkan data
 *    security:
 *      - bearerAuth: true
 *    responses:
 *      200:
 *        description: Data users retrieved successfully
 *      500:
 *        description: Gagal memperoleh data
 */
router.get("/", [authMiddleware(), adminOnly()], userController.index); //index

/**
 * @swagger
 * /users/page/:
 *  get:
 *    tags:
 *      - Users
 *    description: Untuk pagination
 *    security:
 *      - bearerAuth: []
 *    parameters:
 *      - name: page
 *        in: query
 *        schema:
 *          type: integer
 *        description: offset number
 *      - name: size
 *        in: query
 *        schema:
 *          type: integer
 *        description: limit number
 *    responses:
 *      200:
 *        description: Data users retrieved successfully
 *      500:
 *        description: Gagal memperoleh data
 */
router.get("/page", userController.pagination);

/**
 * @swagger
 * /users/{id}/:
 *  get:
 *    tags:
 *      - Users
 *    description: Untuk admin mendapatkan data
 *    security:
 *      - bearerAuth: []
 *    parameters:
 *      - name: id
 *        in: path
 *        schema:
 *          type: integer
 *          format: int64
 *    responses:
 *      200:
 *        description: Data users retrieved successfully
 *      500:
 *        description: Gagal memperoleh data
 */
router.get("/:id", userController.show); //detail user

/**
 * @swagger
 * /users/:
 *  post:
 *    tags:
 *      - Users
 *    description: Untuk User melakukan pendaftaran
 *    security:
 *      - bearerAuth: []
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
 *        description: User created successfully
 *      500:
 *        description: Gagal create user
 */
router.post("/", userController.store); //store

/**
 * @swagger
 * /users/{id}:
 *  put:
 *    tags:
 *      - Users
 *    description: Untuk User Update data
 *    security:
 *      - bearerAuth: []
 *    parameters:
 *      - name: id
 *        in: path
 *        schema:
 *          type: integer
 *          format: int64
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
 *               role:
 *                 type: string
 *                 description: Role User
 *    responses:
 *      200:
 *        description: User update successfully
 *      500:
 *        description: Gagal update user
 */
router.put("/:id", userController.update); //update

/**
 * @swagger
 * /users/{id}/:
 *  delete:
 *    tags:
 *      - Users
 *    description: Untuk admin mendapatkan data
 *    security:
 *      - bearerAuth: []
 *    parameters:
 *      - name: id
 *        in: path
 *        schema:
 *          type: integer
 *          format: int64
 *    responses:
 *      200:
 *        description: Data users deleted successfully
 *      500:
 *        description: Gagal delet data
 */
router.delete("/:id", userController.delete); //delete

/**
 * @swagger
 * /users/onetomany/{id}/:
 *  get:
 *    tags:
 *      - Users
 *    description: Untuk admin mendapatkan data
 *    security:
 *      - bearerAuth: []
 *    parameters:
 *      - name: id
 *        in: path
 *        schema:
 *          type: integer
 *          format: int64
 *    responses:
 *      200:
 *        description: Data users retrieved successfully
 *      500:
 *        description: Gagal memperoleh data
 */
router.get("/onetomany/:id", userController.oneToMany); //index

module.exports = router;
