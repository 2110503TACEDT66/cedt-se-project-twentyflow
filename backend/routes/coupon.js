/**
* @swagger
* components:
*   schemas:
*     Coupon:
*       type: object
*       required:
*         - couponName
*         - couponCode
*         - user
*       properties:
*         couponName:
*           type: string
*           description: The name of the coupon
*         couponCode:
*           type: string
*           description: The code of the coupon
*         user:
*           type: string
*           description: The user of the coupon
*         createdAt:
*           type: string
*           format: date
*           description: The date of the coupon
*       example:
*         couponName: 10% off
*         couponCode: "10OFF"
*
* @swagger
* /coupon:
*   get:
*     summary: Get all coupons
*     tags: [Coupon]
*     security:
*       - bearerAuth: []
*     responses:
*       200:
*         description: A list of coupons
*         content:
*           application/json:
*             schema:
*               type: array
*               items:
*                 $ref: '#/components/schemas/Coupon'
*       401:
*         description: Unauthorized user
*       500:
*         description: Server error
*
*   post:
*     summary: Create a new coupon
*     tags: [Coupon]
*     security:
*       - bearerAuth: []
*     requestBody:
*       required: true
*       content:
*         application/json:
*           schema:
*             $ref: '#/components/schemas/Coupon'
*     responses:
*       200:
*         description: A coupon schema
*         content:
*           application/json:
*             schema:
*               $ref: '#/components/schemas/Coupon'
*       400:
*         description: Invalid coupon
*       500:
*         description: Server error
*
 */

const express = require('express');


const {protect, authorize} = require('../middleware/auth');
const { createCoupon , getCoupons } = require('../controllers/coupon');

const router = express.Router();


router.route('/').post(protect,authorize('admin','user'),createCoupon).get(protect,authorize('admin','user'),getCoupons)

module.exports = router