const mongoose=require('mongoose');

const AppointmentSchema=new mongoose.Schema({
    startTime: {
        type: Date,
        required:true
    },
    endTime: {
        type: Date,
        required:true
    },
    user:{
        type:mongoose.Schema.ObjectId,
        ref: 'User' ,
        required:true
    },
    coWorking: {
        type:mongoose.Schema.ObjectId,
        ref: 'CoWorking' ,
        required:true
    },
    createdAt: {
        type: Date,
        default: Date.now
    },
    priceId : {
        type: String,
        required: [true, 'Please add a priceId']
    },
    status : {
        type: String,
        enum: ['finished','unfinished'],
        default: 'unfinished'
    },
});


module.exports=mongoose.model('Appointment' ,AppointmentSchema);