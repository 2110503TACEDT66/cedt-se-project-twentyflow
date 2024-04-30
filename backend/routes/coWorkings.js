/** 
* @swagger
* components:
*  schemas:
*     CoWorking:
*       type: object
*       required:
*         - name
*         - address
*         - district
*         - province
*         - postalCode
*         - tel
*         - price_hourly
*         - openTime
*         - closeTime
*         - rooms
*       properties:
*         name:
*           type: string
*           description: The name of the co-working
*         address:
*           type: string
*           description: The address of the co-working
*         district:
*           type: string
*           description: The district of the co-working
*         province:
*           type: string
*           description: The province of the co-working
*         postalCode:
*           type: string
*           description: The postal code of the co-working
*         tel:
*           type: string
*           description: The telephone number of the co-working
*         price_hourly:
*           type: number
*           description: The price hourly of the co-working
*         openTime:
*           type: string
*           description: The open time of the co-working
*         closeTime:
*           type: string
*           description: The close time of the co-working
*         rooms:
*           type: array
*           items:
*               type: string
*           description: The rooms of the co-working
*         createdAt:
*           type: string
*           format: date
*           description: The date of the co-working
*       example:
*         name: CEDT
*         address: 123 Street
*         district: District 1
*         province: Ho Chi Minh
*         postalCode: 700000
*         tel: "08012345678"
*         price_hourly: 100000
*         openTime: 08:00
*         closeTime: 18:00
*         rooms: ["61f7b2b3d8a7b9e5f4d4e9b3"]
*         createdAt: 2024-04-24T12:01:23.124+00:00
*
* @swagger
* tags:
*   name: CoWorkings
*   description: The CoWorkings managing API
*
* @swagger
* /coworkings:
*   get:
*     summary: Get all co-workings
*     tags: [CoWorkings]
*     responses:
*       200:
*         description: A list of co-workings
*         content:
*           application/json:
*             schema:
*               type: array
*               items:
*                 $ref: '#/components/schemas/CoWorking'
*       401:
*         description: Unauthorized user
*       500:
*         description: Server error
*
*   post:
*     summary: Create a new co-working
*     tags: [CoWorkings]
*     security:
*       - bearerAuth: []
*     requestBody:
*       required: true
*       content:
*         application/json:
*           schema:
*             $ref: '#/components/schemas/CoWorking'
*     responses:
*       200:
*         description: A co-working schema
*         content:
*           application/json:
*             schema:
*               $ref: '#/components/schemas/CoWorking'
*       400:
*         description: Invalid co-working
*       500:
*         description: Server error
*
* @swagger
* /coworkings/{id}:
*   get:
*     summary: Get the co-working by ID
*     tags: [CoWorkings]
*     parameters:
*       - in: path
*         name: id
*         schema:
*           type: string
*         required: true
*         description: The co-working ID
*     responses:
*       200:
*         description: The co-working description by ID
*         content:
*           application/json:
*             schema:
*               $ref: '#/components/schemas/CoWorking'
*       401:
*         description: Unauthorized user
*       404:
*         description: The co-working was not found
*       500:
*         description: Server error
*
*   put:
*     summary: Update the co-working by ID
*     tags: [CoWorkings]
*     security:
*       - bearerAuth: []
*     parameters:
*       - in: path
*         name: id
*         schema:
*           type: string
*         required: true
*         description: The co-working ID
*     requestBody:
*       required: true
*       content:
*         application/json:
*           schema:
*             $ref: '#/components/schemas/CoWorking'
*     responses:
*       200:
*         description: The co-working schema
*         content:
*           application/json:
*             schema:
*               $ref: '#/components/schemas/CoWorking'
*       400:
*         description: Invalid co-working
*       401:
*         description: Unauthorized user
*       404:
*         description: The co-working was not found
*       500:
*         description: Server error
*
*   delete:
*     summary: Delete the co-working by ID
*     tags: [CoWorkings]
*     security:
*       - bearerAuth: []
*     parameters:
*       - in: path
*         name: id
*         schema:
*           type: string
*         required: true
*         description: The co-working ID
*     responses:
*       200:
*         description: The co-working was deleted
*       401:
*         description: Unauthorized user
*       404:
*         description: The co-working was not found
*       500:
*         description: Server error
*

*/



const express = require('express');
const { getCoWorkings, getCoWorking, createCoWorking , updateCoWorking , deleteCoWorking } = require('../controllers/coWorkings');

const appointmentRouter = require('./appointments');

const {protect, authorize} = require('../middleware/auth');

const router = express.Router();


router.use('/:coWorkingId/appointments/',appointmentRouter);

router.route('/').get(getCoWorkings).post(protect,authorize('admin'),createCoWorking);
router.route('/:id').get(getCoWorking).put(protect,authorize('admin'),updateCoWorking).delete(protect,authorize('admin'),deleteCoWorking);

module.exports = router