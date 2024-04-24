const express = require('express');

const {protect, authorize} = require('../middleware/auth');
const { addRoom, getRooms } = require('../controllers/room');


const router = express.Router();


router.route('/:coWorkingId').post(addRoom).get(protect,authorize('admin','user'),getRooms)

module.exports = router