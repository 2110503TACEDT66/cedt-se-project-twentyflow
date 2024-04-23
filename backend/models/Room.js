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
    

});

module.exports=mongoose.model('Room' ,RoomSchema);