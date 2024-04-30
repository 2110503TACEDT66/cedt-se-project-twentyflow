/** 
* @swagger
* /ranking/{id}/sumUserBookingHours:
*   get:
*     summary: Get sum of user booking hours
*     tags: [Ranking]
*     security:
*       - bearerAuth: []
*     parameters:
*       - in: path
*         name: id
*         schema:
*           type: string
*         required: true
*         description: The user ID
*     responses:
*       200:
*         description: Sum of user booking hours
*         content:
*           application/json:
*             schema:
*               type: object
*               properties:
*                 success:
*                   type: boolean
*                 data:
*                   type: number
*       401:
*         description: Unauthorized user
*       404:
*         description: User not found
*       500:
*         description: Server error
*
*/


const express = require('express');
const {sumUserBookingHours} = require('../controllers/user');

const router = express.Router();
const {protect,authorize} = require('../middleware/auth');

router.route('/:id/sumUserBookingHours').get(protect,authorize('admin','user'),sumUserBookingHours);

module.exports = router;