//update user name,email
// update user name, email
const User = require('../models/User');
const Appointment = require('../models/Appointment');
const updateUserProfile = async (req, res , next) => {
    try {
        let user = await User.findById(req.params.id);

        if (!user) {
            return res.status(404).json({
                success: false,
                message: 'User not found',
            });
        }

        if (user._id.toString() !== req.user.id && req.user.role !== 'admin') {
            return res.status(401).json({
                success: false,
                message: `User ${req.user.id} is not authorized to update this user`,
            });
        }

        user = await User.findByIdAndUpdate(req.params.id,req.body,{
            new:true,
            runValidators:true
        });

        res.status(200).json({
            success:true,
            data: user
        });
        
    } catch (error) {
        return res.status(500).json({
            success:false,
            message:"Cannot update User"
        });
    }
};


const sumUserBookingHours = async (req, res) => {
    try {
        const user = await User.findById(req.params.id);

        if (!user) {
            return res.status(404).json({
                success: false,
                message: 'User not found',
            });
        }

        if (user._id.toString() !== req.user.id && req.user.role !== 'admin') {
            return res.status(401).json({
                success: false,
                message: `User ${req.user.id} is not authorized to update this user`,
            });
        }

        const userBookingHours = await Appointment.aggregate([
            {
                $match: {
                    user: user._id,
                    status: 'finished',
                },
            },
            {
                $project: {
                    startMinutes: {
                        $add: [
                            { $multiply: [{ $toInt: { $substr: ['$startTime', 0, 2] } }, 60] },
                            { $toInt: { $substr: ['$startTime', 3, 2] } },
                        ],
                    },
                    endMinutes: {
                        $add: [
                            { $multiply: [{ $toInt: { $substr: ['$endTime', 0, 2] } }, 60] },
                            { $toInt: { $substr: ['$endTime', 3, 2] } },
                        ],
                    },
                },
            },
            {
                $group: {
                    _id: '$user',
                    totalMinutes: { $sum: { $subtract: ['$endMinutes', '$startMinutes'] } },
                },
            },
            {
                $project: {
                    totalHours: { $divide: ['$totalMinutes', 60] },
                },
            },
        ]);

        res.status(200).json({
            success: true,
            data: userBookingHours,
        });
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: `Cannot get user booking hours ${error}`,
        });
    }
};







module.exports = {
    updateUserProfile,
    sumUserBookingHours
};