const express = require('express');
const {sumUserBookingHours} = require('../controllers/user');

const router = express.Router();
const {protect,authorize} = require('../middleware/auth');

router.route('/:id/sumUserBookingHours').get(protect,authorize('admin','user'),sumUserBookingHours);

module.exports = router;