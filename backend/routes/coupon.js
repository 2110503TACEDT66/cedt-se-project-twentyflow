const express = require('express');


const {protect, authorize} = require('../middleware/auth');
const { createCoupon } = require('../controllers/coupon');

const router = express.Router();


router.route('/').post(protect,authorize('admin','user'),createCoupon);

module.exports = router