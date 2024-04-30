/** 
* @swagger 
* components:
*   schemas:
*     Reward:
*       type: object
*       required:
*         - user
*         - rewardName
*         - rewardPoint
*         - createdAt
*       properties:
*         user:
*           type: string
*           description: The user ID
*         rewardName:
*           type: string
*           description: The reward name
*         rewardPoint:
*           type: number
*           description: The reward point
*         createdAt:
*           type: string
*           format: date
*           description: The date of the history
*       example:
*         user: 61f7b2b3d8a7b9e5f4d4e9b3
*         rewardName: Free Coffee
*         rewardPoint: 10
*         createdAt: 2024-04-24T12:01:23.124+00:00
*
* @swagger
* /reward:
*   get:
*     summary: Get all rewards
*     tags: [Reward]
*     security:
*       - bearerAuth: []
*     responses:
*       200:
*         description: A list of rewards
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
*       401:
*         description: Unauthorized user
*       500:
*         description: Server error
*
*   post:
*     summary: Create a new reward
*     tags: [Reward]
*     security:
*       - bearerAuth: []
*     requestBody:
*       required: true
*       content:
*         application/json:
*           schema:
*             type: object
*             properties:
*               rewardName:
*                 type: string
*                 description: The reward name
*               rewardPoint:
*                 type: number
*                 description: The reward point
*     responses:
*       200:
*         description: A reward schema
*         content:
*           application/json:
*             schema:
*               $ref: '#/components/schemas/History'
*       401:
*         description: Unauthorized user
*       500:
*         description: Server error
*
*/


const express = require('express');
const {createReward , getRewards} = require('../controllers/reward');

const {protect, authorize} = require('../middleware/auth');

const router = express.Router();


router.route('/').post(protect,authorize('admin','user'),createReward).get(protect,authorize('admin','user'),getRewards);

module.exports = router