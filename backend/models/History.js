const mongoose=require('mongoose');

const HistorySchema=new mongoose.Schema({
    user:{
        type:mongoose.Schema.ObjectId,
        ref: 'User' ,
        required:true
    },
    coWorking: {
        type:mongoose.Schema.ObjectId,
        ref: 'CoWorking' ,
        required:true
    },price:{
        type:Number,
        required:true
    },createdAt:{
        type:Date,
        default: Date.now,
        required:true
    }
});

module.exports=mongoose.model('History' ,HistorySchema);