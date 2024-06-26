
const Appointment = require('../models/Appointment');
const User = require('../models/User');
const CoWorking = require('../models/CoWorking');
const History = require('../models/History');
const Stripe = require('stripe');
const stripe = new Stripe(String(process.env.STRIPE_SECRET_KEY));

// @desc        Get dashboard
// @route       GET /api/v1/dashboard
// @access      Private
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

// @desc        Get customer this month
// @route       GET /api/v1/dashboard/customer
// @access      Private
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

// @desc        Get customer monthly trend
// @route       GET /api/v1/dashboard/customer/monthly
// @access      Private
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
        
        let trend;
        if(lastMonthUsers.length === 0) {
            thisMonthUsers == 0 ? trend = 0 : trend = 100;
        } else {
            trend = Math.round((thisMonthUsers.length - lastMonthUsers.length)/lastMonthUsers.length * 100);
        }
        
        res.status(200).json({ success: true, trends:trend });
    } catch (err) {
        res.status(400).json({success:false})
    }
}

// @desc        Get customer daily trend
// @route       GET /api/v1/dashboard/customer/daily
// @access      Private
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
        
        let trend;

        if(yesterdayUsers.length === 0) {
            todayUsers == 0 ? trend = 0 : trend = 100;
        } else {
            trend = Math.round((todayUsers.length - yesterdayUsers.length)/yesterdayUsers.length * 100)
        }
        res.status(200).json({ success: true, data: { trends:  trend, yesterday: yesterdayUsers, today: todayUsers} });
    } catch (err) {
        res.status(400).json({success:false})
    }
}

// @desc        Get yearly revenue
// @route       GET /api/v1/dashboard/revenue/yearly
// @access      Private
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
        
        const histories = await History.find();

        //getPrices
        //const products = await stripe.products.list();
        //const prices = await stripe.prices.list();

        //  ***** success false => most history in database doesn't have createdAt field
        histories.forEach(appt => {
            const date = new Date(appt.createdAt);
            if(date.getFullYear() == new Date().getFullYear()) {
                yearlyRevenue[date.getMonth()][1] += appt.price;
            }
        })
        res.status(200).json({success:true, data: {yearlyRevenue}})

    } catch(err) {
        res.status(400).json({success:false});
    }
}

// @desc        Get weekly revenue
// @route       GET /api/v1/dashboard/revenue/weekly
// @access      Private
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
        
        const histories = await History.find();

        //getPrices
        //const products = await stripe.products.list();
        //const prices = await stripe.prices.list();

        histories.forEach(appt => {
            const date = new Date(appt.createdAt)
            const today = new Date();
            const timeDifference = today - date; 
            const datedif = timeDifference / (1000 * 60 * 60 * 24);

            const todayOfWeek = getDayOfWeek(today.getFullYear(), today.getMonth(), today.getDate());
            const dayOfWeeks = getDayOfWeek(date.getFullYear(), date.getMonth(), date.getDate());

            // ** if today is wednesday it will show only sunday, monday, tuesday
            // condition is on "dayOfWeeks <= todayOfWeek"
            if(today.getFullYear() === date.getFullYear() && (0 <= datedif && datedif <= 7) && (dayOfWeeks <= todayOfWeek)) {
                weeklyRevenue[dayOfWeeks][1] += appt.price;
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

// @desc        Get daily revenue
// @route       GET /api/v1/dashboard/revenue/daily
// @access      Private
exports.getActiveUser = async (req,res,next) => {
    try {
        const histories = await History.find();
        let activeUser = histories.filter(appt => {
            const dateBook = new Date(appt.createdAt);
            const currentDate = new Date();
            const timeDifference = currentDate - dateBook; 
            const datedif = timeDifference / (1000 * 60 * 60 * 24);
            
            return datedif <= 7 && datedif >= 0;
        });
        let yesterdayActiveUser = histories.filter(appt => {
            const dateBook = new Date(appt.createdAt);
            let yesterDay = new Date();
            yesterDay.setDate(yesterDay.getDate() - 1);
            const timeDifference = yesterDay - dateBook; 
            const datedif = timeDifference / (1000 * 60 * 60 * 24);
            return datedif <= 7 && datedif >= 0;
        });

        activeUser = removeDuplicates(activeUser)

        let trend = 0;
        if(yesterdayActiveUser.length == 0) {
            activeUser.length == 0 ? trend = 0 : trend = 100; 
        } else {
            trend = Math.round((activeUser.length - yesterdayActiveUser.length) / yesterdayActiveUser.length * 100);
        }

        res.status(200).json({success:true, data:{
            ActiveUser: activeUser,
            count: activeUser.length,
            trends: trend
        }});
    } catch(err) {
        res.status(400).json({success:false, error:err.message})
    }


    function removeDuplicates(arr) {
        let newArray = [];
        let uniqueObject = {};
        for (let i in arr) {
            objName = arr[i]['user'];
            uniqueObject[objName] = arr[i];
        }
        for (i in uniqueObject) {
            newArray.push(uniqueObject[i]);
        }

        return newArray;
    }
}

// @desc        Get new and return customer
// @route       GET /api/v1/dashboard/customer/new-return
// @access      Private
exports.getNewReturnCustomer = async (req,res,next) => {
    try {
        const customer = [
            ['New', 0],
            ['Return', 0]
        ]

        const histories = await History.find();    

        const userBookings = {};

        histories.forEach(booking => {
            const userId = booking.user.toString(); // Convert ObjectId to string
            const createdAt = booking.createdAt; // Get the createdAt timestamp

            if (userBookings[userId]) {
                userBookings[userId].bookings++;
                userBookings[userId].createdAt.push(createdAt);
            } else {
                userBookings[userId] = {
                bookings: 1,
                createdAt: [createdAt]
                };
            }
        });

        // Convert the object to an array of objects
        const result = Object.keys(userBookings).map(userId => ({
            user: userId,
            bookings: userBookings[userId].bookings,
            createdAt: userBookings[userId].createdAt
        }));

        result.forEach(element => {
            if(element.bookings > 1) {
                customer[1][1]++;
            } else {
                customer[0][1]++;
            }
        });

        res.status(200).json({success:true, data:{customer}})
    } catch(err) {
        res.status(400).json({success:false,error:err.message})
    }
}

// @desc        Get revenue trend
// @route       GET /api/v1/dashboard/revenue/trend 
// @access      Private
exports.getRevenueTrend = async (req,res,next) => {
    try {
        const histories = await History.find();
        const histories2 = histories;

        let todayRevenue = 0;
        const totalPrice = histories2.reduce((total, history) => total + history.price, 0);
        histories.forEach(element => {
            const today = new Date();
            const purchaseDate = element.createdAt;
            if(purchaseDate.getDate() === today.getDate() && purchaseDate.getMonth() === today.getMonth() && purchaseDate.getFullYear() === today.getFullYear()) {
                todayRevenue += element.price;
            }
        })

        const totalFromPastToYesterday = totalPrice - todayRevenue;
        
        let trend;
        if(totalFromPastToYesterday === 0) {
            todayRevenue === 0 ? trend = 0 : trend = 100;
        } else {
            trend = (todayRevenue/totalFromPastToYesterday) * 100;
        }

        res.status(200).json({success:true, trends: trend});

    } catch(err) {
        res.status(400).json({successfalse, error:err.message})
    }

}