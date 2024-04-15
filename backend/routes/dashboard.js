const express = require('express');
const {getDashboard, getCustomerMonthTrend, getCustomerDailyTrend, getCustomerThisMonth, getYearlyRevenue} = require('../controllers/dashboard');

const {protect, authorize} = require('../middleware/auth');

const router = express.Router();

router.route('/').get(protect,authorize('admin'),getDashboard)
router.route('/customer').get(protect, authorize('admin'), getCustomerThisMonth)
                        .get('/monthly',protect,authorize('admin'), getCustomerMonthTrend)
                        .get('/daily',protect,authorize('admin'), getCustomerDailyTrend)
router.route('/revenue').get('/yearly',protect, authorize('admin'), getYearlyRevenue)

module.exports = router