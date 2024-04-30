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
// router.put('/updateprofile',(protect, authorize('admin','user'),updateProfile));
router.put('/updatepoints',protect,updatePoints);
router.post('/updateall',protect, updateAll);
router.route('/:id').get(getMe).put(protect,authorize('user','admin'),updateUserProfile)
module.exports = router;