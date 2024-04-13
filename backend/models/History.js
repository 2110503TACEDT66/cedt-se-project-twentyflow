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
    },appointment:{
        type:mongoose.Schema.ObjectId,
        ref: 'Appointment' ,
        required:true
    },price:{
        type:Number,
        required:true
    },
});

module.exports=mongoose.model('History' ,HistorySchema);