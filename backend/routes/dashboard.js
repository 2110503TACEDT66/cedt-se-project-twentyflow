const express = require('express');
const {getDashboard, getCustomerMonthTrend, getCustomerDailyTrend, getCustomerThisMonth, getYearlyRevenue, getActiveUser, getNewReturnCustomer, getWeeklyRevenue, getRevenueTrend} = require('../controllers/dashboard');

const {protect, authorize} = require('../middleware/auth');

const router = express.Router();

router.route('/').get(protect,authorize('admin'),getDashboard)
router.route('/customer').get(protect, authorize('admin'), getCustomerThisMonth)
router.route('/customer/monthly').get(protect,authorize('admin'), getCustomerMonthTrend)
router.route('/customer/daily').get(protect,authorize('admin'), getCustomerDailyTrend)
router.route('/customer/active').get(protect,authorize('admin'), getActiveUser)
router.route('/customer/newReturn').get(protect,authorize('admin'), getNewReturnCustomer)
router.route('/revenue/yearly').get(protect, authorize('admin'), getYearlyRevenue)
router.route('/revenue/weekly').get(protect, authorize('admin'), getWeeklyRevenue)
router.route('/revenue/trend').get(protect, authorize('admin'), getRevenueTrend)

module.exports = router