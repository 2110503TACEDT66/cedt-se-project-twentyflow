const express = require('express');
const {createReward , getRewards} = require('../controllers/reward');

const {protect, authorize} = require('../middleware/auth');

const router = express.Router();


router.route('/').post(protect,authorize('admin','user'),createReward).get(protect,authorize('admin','user'),getRewards);

module.exports = router