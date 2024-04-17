const express = require('express');
const {createPaymentSession, createPrice, getPrices, getCreditCard} = require('../controllers/Stripe');
const {protect,authorize} = require('../middleware/auth');

const router = express.Router();

router.route('/')
    .post(protect, authorize('admin','user'), createPrice)
    .get(protect, authorize('admin','user'), getPrices);

router.route('/session')
    .post(protect, authorize('admin','user'), createPaymentSession);

router.route('/:id')
    .get(protect, authorize('user'), getCreditCard);
    // .post(protect, authorize('user', createCredit))

module.exports = router