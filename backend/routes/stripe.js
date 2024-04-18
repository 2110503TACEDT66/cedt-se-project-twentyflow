const express = require('express');
const {createPaymentSession, createPrice, getPrices, getUserInfo, updateCustomer} = require('../controllers/Stripe');
const {protect,authorize} = require('../middleware/auth');

const router = express.Router();

router.route('/')
    .post(protect, authorize('admin','user'), createPrice)
    .get(protect, authorize('admin','user'), getPrices);

router.route('/session')
    .post(protect, authorize('admin','user'), createPaymentSession);

router.route('/user/:id')
    .get(protect, authorize('admin','user'), getUserInfo)
    .put(protect, authorize('admin','user'), updateCustomer);

   


module.exports = router