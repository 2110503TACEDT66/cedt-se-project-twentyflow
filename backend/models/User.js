const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');


const UserSchema = new mongoose.Schema({
    name:{
        type: String,
        required: [true, 'Please add a name']
    },
    telephone_number: {
        type: String,
        required: [true, 'Please add a telephone number']
    },
    email:{
        type: String,
        required: [true,'Please add an email'],
        unique: true,
        match: [/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
        'Please add a valid email'
        ]
    },
    role: {
        type: String,
        enum: ['user','admin'],
        default: 'user'
    },
    customerId : {
        type: String,
        required: [true, 'Please add a customerId']
    },
    password: {
        type:String,
        required: [true, 'Please add a password'],
        minlength: 6,
        select: false
    },
    resetPasswordToken: String,
    resetPasswordExpire: Date,
    createdAt: {
        type: Date,
        default: Date.now
    },
    //add points to user schema
    points: {
        type: Number,
        default: 0
    },
});

UserSchema.virtual('appointments', {
    ref: 'Appointment',
    localField: '_id',
    foreignField: 'user',
    justOne:false
});

//Encrypt password using bcrypt
UserSchema.pre('save',async function(next) {
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password,salt);
});

//Sign JWT and return
UserSchema.methods.getSignedJwtToken = function() {
    return jwt.sign({id:this._id},process.env.JWT_SECRET,{
        expiresIn: process.env.JWT_EXPIRE
    });
}

//Match user entered password to hashed password in database
UserSchema.methods.matchPassword = async function(enteredPassword){
    return await bcrypt.compare(enteredPassword, this.password);
}

module.exports = mongoose.model('User',UserSchema);