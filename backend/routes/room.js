/** 
* @swagger
* components:
*  schemas:
*    Room:
*      type: object
*      required:
*        - coWorking
*        - roomNumber
*        - capacity
*        - createdAt
*      properties:
*        id:
*          type: string
*          description: The auto-generated id of the room
*        coWorking:
*          type: string
*          description: The co-working space id
*        roomNumber:
*          type: string
*          description: The room number
*        capacity:
*          type: number
*          description: The capacity of the room
*        createdAt:
*          type: string
*          format: date-time
*          description: The date of the room creation
*      example:
*        id: 61f7b2b3d8a7b9e5f4d4e9b3
*        coWorking: 61f7b2b3d8a7b9e5f4d4e9b3
*        roomNumber: 101
*        capacity: 10
*        createdAt: 2024-04-24T12:01:23.124+00:00
*
* @swagger
* tags:
*   name: Room
*   description: Room management
*
* @swagger
* /room:
*   get:
*     summary: Get all rooms
*     tags: [Room]
*     security:
*       - bearerAuth: []
*     responses:
*       200:
*         description: A list of rooms
*         content:
*           application/json:
*             schema:
*               type: object
*               properties:
*                 success:
*                   type: boolean
*                 count:
*                   type: number
*                 data:
*                   type: array
*                   items:
*                     $ref: '#/components/schemas/Room'
*       401:
*         description: Unauthorized user
*       500:
*         description: Server error
*   post:
*     summary: Create a new room
*     tags: [Room]
*     security:
*       - bearerAuth: []
*     requestBody:
*       required: true
*       content:
*         application/json:
*           schema:
*             $ref: '#/components/schemas/Room'
*     responses:
*       200:
*         description: A room schema
*         content:
*           application/json:
*             schema:
*               $ref: '#/components/schemas/Room'
*       401:
*         description: Unauthorized user
*       500:
*         description: Server error
*
* /room/{id}:
*   get:
*     summary: Get a room
*     tags: [Room]
*     security:
*       - bearerAuth: []
*     parameters:
*       - in: path
*         name: id
*         required: true
*         description: The room id
*         schema:
*           type: string
*     responses:
*       200:
*         description: A room schema
*         content:
*           application/json:
*             schema:
*               $ref: '#/components/schemas/Room'
*       401:
*         description: Unauthorized user
*       500:
*         description: Server error
*
*/

const express = require('express');

const {protect, authorize} = require('../middleware/auth');
const { addRoom, getRooms, getRoom} = require('../controllers/room');

const appointmentRouter = require('./appointments');

const router = express.Router();


router.route('/').post(protect,authorize('admin'),addRoom).get(protect,authorize('admin','user'),getRooms)
router.route('/:id').get(protect,authorize('admin','user'),getRoom)


module.exports = router