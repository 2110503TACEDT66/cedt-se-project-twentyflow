const express = require('express');
const { getHistory, addHistory } = require('../controllers/history');

const router = express.Router({mergeParams: true});

const {protect, authorize} = require('../middleware/auth');

router.route('/').get(protect, getHistory).post(protect, authorize('admin','user'), addHistory);

module.exports=router;