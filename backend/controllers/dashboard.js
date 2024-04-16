
const Appointment = require('../models/Appointment');
const User = require('../models/User');
const CoWorking = require('../models/CoWorking');
const History = require('../models/History');
const Stripe = require('stripe');
const stripe = new Stripe(String(process.env.STRIPE_SECRET_KEY));

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
        
        const trend = Math.round((thisMonthUsers.length - lastMonthUsers.length)/lastMonthUsers.length * 100)
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
        
        const trend = Math.round((todayUsers.length - yesterdayUsers.length)/yesterdayUsers.length * 100)
        res.status(200).json({ success: true, data: { trends:  trend, yesterday: yesterdayUsers, today: todayUsers} });
    } catch (err) {
        res.status(400).json({success:false})
    }
}

exports.getYearlyRevenue = async (req,res,next) => {
    try {
        const yearlyRevenue = [
            ['Jan', 0],
            ['Feb', 0],
            ['Mar', 0],
            ['Apr', 0],
            ['May', 0],
            ['Jun', 0],
            ['Jul', 0],
            ['Aug', 0], 
            ['Sep', 0],
            ['Oct', 0],
            ['Nov', 0],
            ['Dec', 0],  
        ]
        
        const appointments = await Appointment.find();

        //getPrices
        //const products = await stripe.products.list();
        const prices = await stripe.prices.list();

        appointments.forEach(appt => {
            const date = new Date(appt.createdAt);
            if(appt.status === 'finished') {
                const price = prices.data.find(element => element.id === appt.priceId);
        
                if (price) {
                    const month = date.getMonth();
                    yearlyRevenue[month][1] += price.unit_amount/100;
                }
            }
        })

        res.status(200).json({success:true, data: {yearlyRevenue}})
    } catch(err) {
        res.status(400).json({success:false});
    }
}

exports.getWeeklyRevenue = async (req,res,next) => {
    try {
        const weeklyRevenue = [
            ['Sun', 0],
            ['Mon', 0],
            ['Tue', 0],
            ['Wed', 0],
            ['Thu', 0],
            ['Fri', 0],
            ['Sat', 0],  
        ]
        
        const appointments = await Appointment.find();

        //getPrices
        //const products = await stripe.products.list();
        const prices = await stripe.prices.list();

        appointments.forEach(appt => {
            const date = new Date(appt.createdAt)
            if(appt.status === 'finished') {
                const price = prices.data.find(element => element.id === appt.priceId);
        
                if (price) {
                    const dayOfWeeks = getDayOfWeek(date.getFullYear(), date.getMonth(), date.getDate())

                    weeklyRevenue[dayOfWeeks][1] += price.unit_amount/100;
                }
            }
        })

        function getDayOfWeek(year, month, day) {
            const date = new Date(year, month, day);
            const dayOfWeeks = date.getDay();
            return dayOfWeeks;
        }

        res.status(200).json({success:true, data: {weeklyRevenue}})
    } catch(err) {
        res.status(400).json({success:false});
    }
}

exports.getActiveUser = async (req,res,next) => {
    try {
        const appointments = await Appointment.find();

        const activeUser = appointments.filter(appt => {
            const dateBook = new Date(appt.createdAt);
            const currentDate = new Date();
            const timeDifference = currentDate - dateBook; 
            const datedif = timeDifference / (1000 * 60 * 60 * 24);
            
            return (datedif <= 7 && datedif >= 0) && appt.status === 'finished';
        });

        const yesterdayActiveUser = appointments.filter(appt => {
            const dateBook = new Date(appt.createdAt);
            const yesterDay = new Date();
            yesterDay.setDate(yesterDay.getDate() - 1);
            const timeDifference = currentDate - dateBook; 
            const datedif = timeDifference / (1000 * 60 * 60 * 24);
            
            return (datedif <= 7 && datedif >= 0) && appt.status === 'finished';
        });

        const trend = Math.round((activeUser.length - yesterdayActiveUser.length) / yesterdayActiveUser.length * 100)

        res.status(200).json({success:true, ActiveUser: activeUser.length, trend:trend});
    } catch(err) {
        res.status(400).json({success:false, error:err.message})
    }
}

exports.getNewReturnCustomer = async (req,res,next) => {
    try {
        const newCustomer = [
            ['Sun', 0],
            ['Mon', 0],
            ['Tue', 0],
            ['Wed', 0],
            ['Thu', 0],
            ['Fri', 0],
            ['Sat', 0],  
        ]
        const returnCustomer = [
            ['Sun', 0],
            ['Mon', 0],
            ['Tue', 0],
            ['Wed', 0],
            ['Thu', 0],
            ['Fri', 0],
            ['Sat', 0],  
        ]

        const appointments = await Appointment.find();

        appointments.forEach(appt => {

            const date = new Date(appt.createdAt)
            date = new Date(date.getFullYear(), date.getMonth(), date.getDate());
            const dayOfWeek = date.getDate()

            const newOrRe = appointments.filter(user => {
                return user.user === appt.user
            })
            if(newOrRe.length === 1) {
                newCustomer[dayOfWeek][1]++
            } else {
                returnCustomer[dayOfWeek][1]++
            }
        })


        res.status(200).json({success:true, data:{New:newCustomer, Return:returnCustomer}})
    } catch(err) {
        res.status(400).json({success:false})
    }
}