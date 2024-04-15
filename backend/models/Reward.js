const mongoose=require('mongoose');

const RewardSchema=new mongoose.Schema({
    user:{
        type:mongoose.Schema.ObjectId,
        ref: 'User' ,
        required:true
    },
    rewardName: {
        type: String,
        required:true
    },
    rewardPoint: {
        type: Number,
        required:true
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
    

});

module.exports=mongoose.model('Reward' ,RewardSchema);