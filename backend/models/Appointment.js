const mongoose=require('mongoose');

const AppointmentSchema=new mongoose.Schema({
    startTime: {
        type: String,
        required:true
    },
    endTime: {
        type: String,
        required:true
    },
    date : {
        type: Date,
        required:true
    },
    room : {
        type:mongoose.Schema.ObjectId,
        ref: 'Room' ,
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
    additional : {
        type: String,
        required: [true, 'Please add a additional']
    },
});


AppointmentSchema.virtual('history', {
    ref: 'History',
    localField: '_id',
    foreignField: 'appointment',
    justOne:false
});

// AppointmentSchema.pre('deleteOne', {document:true, query: false}, async function(next){
//     await this.model('TimeAppointment').deleteMany({appointment: this._id});
// })


module.exports=mongoose.model('Appointment' ,AppointmentSchema);