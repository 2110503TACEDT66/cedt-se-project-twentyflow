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
* /user/price:
*   get:
*     summary: Get all users sorted by price
*     tags: [Ranking]
*     responses:
*       200:
*         description: A list of users
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
*                     $ref: '#/components/schemas/User'
*       401:
*         description: Unauthorized user
*       500:
*         description: Server error
*
* /user/hour:
*   get:
*     summary: Get all users sorted by hours
*     tags: [Ranking]
*     responses:
*       200:
*         description: A list of users
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
*                     $ref: '#/components/schemas/User'
*       401:
*         description: Unauthorized user
*       500:
*         description: Server error
*
*/


const express = require('express');
const {getUserSortByPrice , sumUserBookingHours} = require('../controllers/user');

const router = express.Router({mergeParams:true});

router.route('/price').get(getUserSortByPrice);
router.route('/hour').get(sumUserBookingHours);

module.exports=router;