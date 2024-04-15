
const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);
const Coupon = require('../models/Coupon');

exports.createCoupon = async (req,res,next) => {
    try {
        const couponStripe = await stripe.coupons.create({
            duration: 'once',
            amount_off: req.body.couponAmount,
            currency: 'thb',
          });
        const couponModel = await Coupon.create(
            {
                couponName: req.body.couponName,
                couponCode: couponStripe.id,
                user: req.user.id
            }
        );
        res.status(200).json({
            success: true,
            data: couponStripe
        });
    } catch (err) {
        console.log(err);
        res.status(400).json({ success: false });
    }
}