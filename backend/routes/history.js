/** 
* @swagger
* components:
*   schemas:
*     History:
*       type: object
*       required:
*         - user
*         - coWorking
*         - appointment
*         - price
*         - hour
*         - createdAt
*       properties:
*         user:
*           type: string
*           description: The user of the history
*         coWorking:
*           type: string
*           description: The co-working of the history
*         appointment:
*           type: string
*           description: The appointment of the history
*         price:
*           type: number
*           description: The price of the history
*         hour:
*           type: number
*           description: The hour of the history
*         createdAt:
*           type: string
*           format: date
*           description: The date of the history
*       example:
*         user: 61f7b2b3d8a7b9e5f4d4e9b3
*         coWorking: 61f7b2b3d8a7b9e5f4d4e9b3
*         appointment: 61f7b2b3d8a7b9e5f4d4e9b3
*         price: 100
*         hour: 1
*         createdAt: 2024-04-24T12:01:23.124+00:00
*
* @swagger
* /history:
*   get:
*     summary: Get all histories
*     tags: [History]
*     security:
*       - bearerAuth: []
*     responses:
*       200:
*         description: A list of histories
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
*                     $ref: '#/components/schemas/History'  
*       401 :
*         description: Invalid history
*       500:
*         description: Server error
*
*   post:
*     summary: Create a new history
*     tags: [History]
*     security:
*       - bearerAuth: []
*     requestBody:
*       required: true
*       content:
*         application/json:
*           schema:
*             type: object
*             properties:
*               coWorking:
*                 type: string
*               appointment:
*                 type: string
*               price:
*                 type: number
*               hour :
*                 type: number
*     responses:
*       200:
*         description: A new history created
*         content:
*           application/json:
*             schema:
*               type: object
*               properties:
*                 success:
*                   type: boolean
*                 data:
*                   $ref: '#/components/schemas/History'
*       401 :
*         description: Invalid history
*       500:
*         description: Server error
*
* @swagger
* /history/{id}:
*   get:
*     summary: Get the history by ID
*     tags: [History]
*     security:
*       - bearerAuth: []
*     parameters:
*       - in: path
*         name: id
*         schema:
*           type: string
*         required: true
*         description: The history ID
*     responses:
*       200:
*         description: The history description by ID
*         content:
*           application/json:
*             schema:
*               $ref: '#/components/schemas/History'
*       401:
*         description: Unauthorized user
*       404:
*         description: History not found
*       500:
*         description: Server error
*
*   put:
*     summary: Update the history by ID
*     tags: [History]
*     security:
*       - bearerAuth: []
*     parameters:

*       - in: path
*         name: id
*         schema:
*           type: string
*         required: true
*         description: The history ID
*     requestBody:
*       required: true
*       content:
*         application/json:
*           schema:
*             type: object
*             properties:
*               coWorking:
*                 type: string
*               appointment:
*                 type: string
*               price:
*                 type: number
*               hour :
*                 type: number
*     responses:
*       200:
*         description: The history updated
*         content:
*           application/json:
*             schema:
*               $ref: '#/components/schemas/History'
*       401:
*         description: Unauthorized user
*       404:
*         description: History not found
*       500:
*         description: Server error
*
*   delete:
*     summary: Delete the history by ID
*     tags: [History]
*     security:
*       - bearerAuth: []
*     parameters:
*       - in: path
*         name: id
*         schema:
*           type: string
*         required: true
*         description: The history ID
*     responses:
*       200:
*         description: The history deleted
*         content:
*           application/json:
*             schema:
*               type: object
*               properties:
*                 success:
*                   type: boolean
*                 data:
*                   type: object
*       401:
*         description: Unauthorized user
*       404:
*         description: History not found
*       500:
*         description: Server error
*
*/

const express = require('express');
const {getHistories, getHistory, addHistory, updateHistory, deleteHistory ,getHistoriesFromCoworkingAndRoom} = require('../controllers/history');

const router = express.Router({mergeParams:true});

const {protect, authorize} = require('../middleware/auth');

router.route('/').get(protect, getHistories).post(protect, authorize('admin','user'), addHistory);
router.route('/:id').get(protect, getHistory)
      .put(protect, authorize('admin','user'), updateHistory)
      .delete(protect, authorize('admin','user'), deleteHistory);

module.exports=router;