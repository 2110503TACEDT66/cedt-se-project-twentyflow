const express = require('express');
const {getDashboard} = require('../controllers/dashboard');

const {protect, authorize} = require('../middleware/auth');

const router = express.Router();

router.route('/').get(protect,authorize('admin'),getDashboard)

module.exports = router