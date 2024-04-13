const express = require('express');
const {register, login, getMe, logout} = require('../controllers/auth');
const {updateUserProfile} = require('../controllers/user');
const router = express.Router();

const {protect,authorize} = require('../middleware/auth');

router.post('/register',register);
router.post('/login',login);
router.get('/me',protect,getMe);
router.get('/logout',logout);
// router.put('/updateprofile',(protect, authorize('admin','user'),updateProfile));
router.route('/:id').get(getMe).put(protect,authorize('user'),updateUserProfile)

module.exports = router;