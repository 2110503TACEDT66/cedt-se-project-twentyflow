/**
* @swagger
* components:
*  schemas:
*   User:
*     type: object
*     required:
*       -name
*       -email
*       -password
*       -telephone_number
*     properties:
*       name:
*         type: string
*         description: The name of the user
*       email:
*         type: string
*         description: The email of the user
*       password:
*         type: string
*         description: The password of the user
*       role:
*         type: string
*         description: The role of the user
*       points:
*         type: number
*         description: The points of the user
*       telephone_number:
*         type: string
*         description: The telephone number of the user
*       createdAt:
*         type: Date
*         description: The date of the user
*     example:
*       name: John Doe
*       email: johndoe@gmail.com
*       telephone_number: "08012345678"
*       role: "user"
*       password: "123456"
* @swagger
* tags:
*   name: Users
*   description: The Users managing API
*
* @swagger
* /auth/register:
*   post:
*     summary: Register a new user
*     tags: [Users]
*     requestBody:
*       required: true
*       content:
*         application/json:
*           schema:
*             $ref: '#/components/schemas/User'
*     responses:
*       200:
*         description: A user schema
*         content:
*           application/json:
*             schema:
*               $ref: '#/components/schemas/User'
*       400:
*         description: Invalid user
*       500:
*         description: Server error
*
* @swagger
* /auth/login:
*   post:
*     summary: Login user
*     tags: [Users]
*     requestBody:
*       required: true
*       content:
*         application/json:
*           schema:
*             type: object
*             properties:
*               email:
*                 type: string
*               password:
*                 type: string
*             example:
*               email: johndoe@gmail.com
*               password: "123456"
*     responses:
*       200:
*         description: A user schema
*         content:
*           application/json:
*             schema:
*               type : string
*       400:
*         description: Invalid user
*       500:
*         description: Server error
*
* @swagger
* /auth/me:
*   get:
*     summary: Get current logged in user
*     tags: [Users]
*     security:
*       - bearerAuth: []
*     responses:
*       200:
*         description: A user schema
*         content:
*           application/json:
*             schema:
*               $ref: '#/components/schemas/User'
*       400:
*         description: Invalid user
*       500:
*         description: Server error
*
* @swagger
* /auth/logout:
*   get:
*     summary: Logout user
*     tags: [Users]
*     security:
*       - bearerAuth: []
*     responses:
*       200:
*         description: A user schema
*         content:
*           application/json:
*             schema:
*               type : string
*       400:
*         description: Invalid user
*       500:
*         description: Server error
*
* @swagger
* /auth/updatepoints:
*   put:
*     summary: Update user points
*     tags: [Users]
*     security:
*       - bearerAuth: []
*     requestBody:
*       required: true
*       content:
*         application/json:
*           schema:
*             type: object
*             properties:
*               points:
*                 type: number
*             example:
*               points: 10
*     responses:
*       200:
*         description: A user schema
*         content:
*           application/json:
*             schema:
*               $ref: '#/components/schemas/User'
*       400:
*         description: Invalid user
*       500:
*         description: Server error
*
* @swagger
* /auth/updateall:
*   post:
*     summary: Update user points and role
*     tags: [Users]
*     security:
*       - bearerAuth: []
*     requestBody:
*       required: true
*       content:
*         application/json:
*           schema:
*             type: object
*             properties:
*               appointmentId:
*                 type: string
*             example:
*               appointmentId: "60f3f4f3b3f4b10015a7e4b5"
*     responses:
*       200:
*         description: A user schema
*         content:
*           application/json:
*             schema:
*               $ref: '#/components/schemas/User'
*       400:
*         description: Invalid user
*       500:
*         description: Server error
*
* @swagger
* /auth/{id}:
*   put:
*     summary: Update user by ID
*     tags: [Users]
*     security:
*       - bearerAuth: []
*     parameters:
*       - in: path
*         name: id
*         schema:
*           type: string
*         required: true
*         description: The user ID
*     requestBody:
*       required: true
*       content:
*         application/json:
*           schema:
*             type: object
*             properties:
*               name:
*                 type: string
*                 description: The name of the user
*               telephone_number:
*                 type: string
*                 description: The telephone number of the user
*             example:
*               name: John Doe
*               telephone_number: "08012345678"
*     responses:
*       200:
*         description: A user schema
*         content:
*           application/json:
*             schema:
*               $ref: '#/components/schemas/User'
*       400:
*         description: Invalid user
*       500:
*         description: Server error
*

*/



const express = require('express');
const {updateUserProfile} = require('../controllers/user');
const {register, login, getMe, logout, updatePoints , updateAll } = require('../controllers/auth');
const router = express.Router();

const {protect,authorize} = require('../middleware/auth');

router.post('/register',register);
router.post('/login',login);
router.get('/me',protect,getMe);
router.get('/logout',logout);
router.put('/updatepoints',protect,updatePoints);
router.post('/updateall',protect, updateAll);
router.route('/:id').get(getMe).put(protect,authorize('user','admin'),updateUserProfile)
module.exports = router;