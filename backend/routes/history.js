const express = require('express');
const {getHistories, getHistory, addHistory, updateHistory, deleteHistory} = require('../controllers/history');

const router = express.Router({mergeParams:true});

const {protect, authorize} = require('../middleware/auth');

router.route('/').get(protect, getHistories).post(protect, authorize('admin','user'), addHistory);
router.route('/:id').get(protect, getHistory)
      .put(protect, authorize('admin','user'), updateHistory)
      .delete(protect, authorize('admin','user'), deleteHistory);

module.exports=router;