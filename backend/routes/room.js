const express = require('express');

const {protect, authorize} = require('../middleware/auth');
const { addRoom, getRooms, getRoom} = require('../controllers/room');

const appointmentRouter = require('./appointments');

const router = express.Router();


router.route('/').post(addRoom).get(protect,authorize('admin','user'),getRooms)
router.route('/:id').get(protect,authorize('admin','user'),getRoom)


module.exports = router