


const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);
const Coupon = require('../models/Coupon');


//@desc     Create coupon
//@route    POST /api/v1/coupon
//@access   Private
exports.createCoupon = async (req,res,next) => {
    try {
        let couponStripe;
        if (req.body.couponAmount === 10) {
            couponStripe = await stripe.promotionCodes.create({
            coupon: 'HIgDW1BU',
            max_redemptions: 1,
            });
        }
        else if (req.body.couponAmount === 20) {
            couponStripe = await stripe.promotionCodes.create({
            coupon: 'fMdNrjZe',
            max_redemptions: 1,
            });
        }
        else if (req.body.couponAmount === 50) {
            couponStripe = await stripe.promotionCodes.create({
            coupon: 'Ut8Mx2H5',
            max_redemptions : 1,
            });
        }
        else if (req.body.couponAmount === 100) {
            couponStripe = await stripe.promotionCodes.create({
            coupon: '1yoS4e31',
            max_redemptions: 1,
            });
        }
        else {
            return res.status(400).json({
                success: false,
                message: "Invalid coupon amount"
            });
        }
        const couponModel = await Coupon.create(
            {
                couponName: req.body.couponName,
                couponCode: couponStripe.code,
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

//@desc     Get coupons
//@route    GET /api/v1/coupon
//@access   Private
exports.getCoupons = async (req,res,next) => {
    try {
        const coupons = await Coupon.find({user: req.user.id});
        const promotionCodes = await stripe.promotionCodes.list({
            active : false
        });
        const couponss = await Coupon.find({user: req.user.id});
        let couponCodes = [];
        for (c of promotionCodes.data) {
            couponCodes.push(c.code);
        }
        for (coupon of couponss) {
            if (couponCodes.includes(coupon.couponCode)) {
                await Coupon.findByIdAndDelete(coupon._id);
            }
        }
        
        res.status(200).json({
            success: true,
            data: coupons
        });
    } catch (err) {
        console.log(err);
        res.status(400).json({ success: false });
    }
}