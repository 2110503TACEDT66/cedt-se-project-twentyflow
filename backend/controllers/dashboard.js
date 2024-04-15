
const Appointment = require('../models/Appointment');
const User = require('../models/User');
const CoWorking = require('../models/CoWorking');
const History = require('../models/History');
const { now } = require('mongoose');

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
        
        res.status(200).json({success:true, data: {totalAppointments, totalUsers, totalCoWorkings, totalHistories, totalPrice}, data2: {histories}});
    } catch (err){
        res.status(400).json({success:false});
    }

}

exports.getCustomerThisMonth = async (req,res,next) => {
    try {
        const users = await User.find();

        const customerThisMonth = users.filter(user => {
            const userCreatedAt = new Date(user.createdAt);
            const today = new Date()
            return userCreatedAt.getMonth() === today.getMonth() && userCreatedAt.getFullYear() === today.getFullYear();
        });

        res.status(200).json({success:true, data:{totalThisMonthCustomer: customerThisMonth.length}});
    } catch(err) {
        res.status(400).json({success:false})
    }
}

exports.getCustomerMonthTrend = async (req,res,next) => {
    try {
        const users = await User.find();

        //Filter users created this year
        const thisMonthUsers = users.filter(user => {
            const userCreatedAt = new Date(user.createdAt);
            const currentMonth = new Date().getMonth();
            return userCreatedAt.getMonth() === currentMonth;
        });
        const lastMonthUsers = users.filter(user => {
            const userCreatedAt = new Date(user.createdAt);
            let lastMonth = new Date();
            lastMonth.setMonth(lastMonth.getMonth() - 1);
            return userCreatedAt.getMonth() === lastMonth.getMonth() && userCreatedAt.getFullYear() === lastMonth.getFullYear();
        });
        
        const trend = (thisMonthUsers.length - lastMonthUsers.length)/lastMonthUsers.length * 100
        res.status(200).json({ success: true, data: { trends:  trend} });
    } catch (err) {
        res.status(400).json({success:false})
    }
}

exports.getCustomerDailyTrend = async (req,res,next) => {
    try {
        const users = await User.find();

        // Filter users created this year
        const todayUsers = users.filter(user => {
            const userCreatedAt = new Date(user.createdAt);
            const currentDay = new Date();
            return userCreatedAt.getDate() === currentDay.getDate() && userCreatedAt.getMonth() === currentDay.getMonth && userCreatedAt.getFullYear() === currentDay.getFullYear();
        });
        const yesterdayUsers = users.filter(user => {
            const userCreatedAt = new Date(user.createdAt);
            let yesterDay = new Date();
            yesterDay.setDate(yesterDay.getDate() - 1);
            return userCreatedAt.getDate() === yesterDay.getDate() && userCreatedAt.getMonth() === yesterDay.getMonth() && userCreatedAt.getFullYear() === yesterDay.getFullYear();
        });
        
        const trend = (todayUsers.length - yesterdayUsers.length)/yesterdayUsers.length * 100
        res.status(200).json({ success: true, data: { trends:  trend, yesterday: yesterdayUsers, today: todayUsers} });
    } catch (err) {
        res.status(400).json({success:false})
    }
}