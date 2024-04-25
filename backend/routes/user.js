const express = require('express');
const {getUserSortByPrice , sumUserBookingHours} = require('../controllers/user');

const router = express.Router({mergeParams:true});

// const {protect} = require('../middleware/auth');

router.route('/price').get(getUserSortByPrice);
router.route('/hour').get(sumUserBookingHours);

module.exports=router;