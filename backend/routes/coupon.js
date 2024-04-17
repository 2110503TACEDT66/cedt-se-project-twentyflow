const express = require('express');


const {protect, authorize} = require('../middleware/auth');
const { createCoupon , getCoupons } = require('../controllers/coupon');

const router = express.Router();


router.route('/').post(protect,authorize('admin','user'),createCoupon).get(protect,authorize('admin','user'),getCoupons)

module.exports = router