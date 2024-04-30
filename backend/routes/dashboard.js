/** 
* @swagger
* /dashboard:
*   get:
*     summary: Get all dashboard
*     tags: [Dashboard]
*     security:
*       - bearerAuth: []
*     responses:
*       200:
*         description: A list of dashboard
*         content:
*           application/json:
*             schema:
*               type: object
*               properties:
*                 success:
*                   type: boolean
*                 data:
*                   type: object
*                   properties:
*                     totalUsers:
*                       type: number
*                     totalAppointments:
*                       type: number
*                     totalCoworkings:
*                       type: number
*                     totalHistories:
*                       type: number
*                     totalPrice:
*                       type: number
*       401 :
*         description: Invalid dashboard
*       500:
*         description: Server error
*
* /dashboard/customer:
*   get:
*     summary: Get all customer this month
*     tags: [Dashboard]
*     security:
*       - bearerAuth: []
*     responses:
*       200:
*         description: A list of customer this month
*         content:
*           application/json:
*             schema:
*               type: object
*               properties:
*                 success:
*                   type: boolean
*                 data:
*                   type: object
*                   properties:
*                     totalThisMonthCustomer:
*                       type: number
*       401 :
*         description: Invalid dashboard
*       500:
*         description: Server error
*
* /dashboard/customer/monthly:
*   get:
*     summary: Get all customer monthly trend
*     tags: [Dashboard]
*     security:
*       - bearerAuth: []
*     responses:
*       200:
*         description: A list of customer monthly trend
*         content:
*           application/json:
*             schema:
*               type: object
*               properties:
*                 success:
*                   type: boolean
*                 trend:
*                   type: number
*       401 :
*         description: Invalid dashboard
*       500:
*         description: Server error
*
* /dashboard/customer/daily:
*   get:
*     summary: Get all customer daily trend
*     tags: [Dashboard]
*     security:
*       - bearerAuth: []
*     responses:
*       200:
*         description: A list of customer daily trend
*         content:
*           application/json:
*             schema:
*               type: object
*               properties:
*                 success:
*                   type: boolean
*                 data:
*                   type: object
*                   properties:
*                     trend:
*                       type: number
*                     yesterday:
*                       type: array
*                       items:
*                         type: object
*                     today:
*                       type: array  
*                       items:
*                         type: object                          
*       401 :
*         description: Invalid dashboard
*       500:
*         description: Server error
*
* /dashboard/customer/active:
*   get:
*     summary: Get all active user
*     tags: [Dashboard]
*     security:
*       - bearerAuth: []
*     responses:
*       200:
*         description: A list of active user
*         content:
*           application/json:
*             schema:
*               type: object
*               properties:
*                 success:
*                   type: boolean
*                 data:
*                   type: object
*                   properties:
*                     ActiveUser:
*                       type: object
*                     count:
*                       type: number
*                     trend:
*                       type: number
*       401 :
*         description: Invalid dashboard
*       500:
*         description: Server error
*
* /dashboard/customer/newReturn:
*   get:
*     summary: Get all new and return customer
*     tags: [Dashboard]
*     security:
*       - bearerAuth: []
*     responses:
*       200:
*         description: A list of new and return customer
*         content:
*           application/json:
*             schema:
*               type: object
*               properties:
*                 success:
*                   type: boolean
*                 data:
*                   type: object
*                   
*                     
*       401 :
*         description: Invalid dashboard
*       500:
*         description: Server error
*
* /dashboard/revenue/yearly:
*   get:
*     summary: Get all yearly revenue
*     tags: [Dashboard]
*     security:
*       - bearerAuth: []
*     responses:
*       200:
*         description: A list of yearly revenue
*         content:
*           application/json:
*             schema:
*               type: object
*               properties:
*                 success:
*                   type: boolean
*                 data:
*                   type: object
*                   properties:
*                     yearlyRevenue:
*                       type: array
*                       items:
*                         type: object
*                   
*       401 :
*         description: Invalid dashboard
*       500:
*         description: Server error
*
* /dashboard/revenue/weekly:
*   get:
*     summary: Get all weekly revenue
*     tags: [Dashboard]
*     security:
*       - bearerAuth: []
*     responses:
*       200:
*         description: A list of weekly revenue
*         content:
*           application/json:
*             schema:
*               type: object
*               properties:
*                 success:
*                   type: boolean
*                 data:
*                   type: object
*                   properties:
*                     weeklyRevenue:
*                       type: array
*                       items:
*                         type: object
*       401 :
*         description: Invalid dashboard
*       500:
*         description: Server error
*
* /dashboard/revenue/trend:
*   get:
*     summary: Get all revenue trend
*     tags: [Dashboard]

*     security:
*       - bearerAuth: []
*     responses:
*       200:
*         description: A list of revenue trend
*         content:
*           application/json:
*             schema:
*               type: object
*               properties:
*                 success:
*                   type: boolean
*                 trend:
*                   type: number
*       401 :
*         description: Invalid dashboard
*       500:
*         description: Server error
*
*/

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