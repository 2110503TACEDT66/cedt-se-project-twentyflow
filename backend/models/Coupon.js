const mongoose=require('mongoose');

const CouponSchema=new mongoose.Schema({
    
    user:{
        type:mongoose.Schema.ObjectId,
        ref: 'User' ,
        required:true
    },
    couponName: {
        type: String,
        required:true
    },
    couponCode: {
        type: String,
        required:true
    },
    createdAt: {
        type: Date,
        default: Date.now
    },
});

module.exports=mongoose.model('Coupon' ,CouponSchema);