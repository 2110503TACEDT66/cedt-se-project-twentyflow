const express = require('express');
const {register, login, getMe, logout, updatePoints , addCoupon, deleteCoupon } = require('../controllers/auth');
const router = express.Router();

const {protect} = require('../middleware/auth');

router.post('/register',register);
router.post('/login',login);
router.get('/me',protect,getMe);
router.get('/logout',logout);
router.put('/updatepoints',protect,updatePoints);
router.delete('/deletecoupon',protect, deleteCoupon)
router.put('/addcoupon',protect,addCoupon);

module.exports = router;