
const Appointment = require('../models/Appointment');
const User = require('../models/User');
const CoWorking = require('../models/CoWorking');
const History = require('../models/History');

exports.getDashboard = async (req,res,next) => {
    
    try{
        const appointments = await Appointment.find();
        const users = await User.find();
        const coWorkings = await CoWorking.find();
        const histories = await History.find();
        const totalPrice = histories.reduce((total, history) => total + history.price, 0);
        
        
        const totalAppointments = appointments.length;
        const totalUsers = users.length;
        const totalCoWorkings = coWorkings.length;
        const totalHistories = histories.length;
        
        res.status(200).json({success:true, data: {totalAppointments, totalUsers, totalCoWorkings, totalHistories, totalPrice}});
    } catch (err){
        res.status(400).json({success:false});
    }

}
    