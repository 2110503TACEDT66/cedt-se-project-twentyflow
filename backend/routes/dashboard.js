const express = require('express');
const {getDashboard, getCustomerMonthTrend, getCustomerDailyTrend, getCustomerThisMonth} = require('../controllers/dashboard');

const {protect, authorize} = require('../middleware/auth');

const router = express.Router();

router.route('/').get(protect,authorize('admin'),getDashboard)
router.route('/customer').get(protect, authorize('admin'), getCustomerThisMonth)
router.route('/customer/monthly').get(protect,authorize('admin'), getCustomerMonthTrend)
router.route('/customer/daily').get(protect,authorize('admin'), getCustomerDailyTrend)

module.exports = router