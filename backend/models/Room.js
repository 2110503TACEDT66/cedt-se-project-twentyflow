const mongoose=require('mongoose');

const RoomSchema=new mongoose.Schema({
    coWorking:{
        type:mongoose.Schema.ObjectId,
        ref: 'CoWorking' ,
        required:true
    },
    roomNumber: {
        type: Number,
        required:true
    },
    createdAt: {
        type: Date,
        default: Date.now
    },
    capacity: {
        type: Number,
        required: [true, 'Please add a capacity']
    },
    

},{
    toJSON: {virtuals:true},
    toObject: {virtuals:true}
});

RoomSchema.virtual('appointments', {
    ref: 'Appointment',
    localField: '_id',
    foreignField: 'room',
    justOne:false
});

module.exports=mongoose.model('Room' ,RoomSchema);