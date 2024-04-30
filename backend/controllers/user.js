//update user name,email
// update user name, email
const User = require('../models/User');
const Appointment = require('../models/Appointment');
const History = require('../models/History');

// @desc      Update user profile
// @route     PUT /api/v1/auth/:id
// @access    Private
exports.updateUserProfile = async (req, res , next) => {
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

// @desc      Get all sum of user's booking hours
// @route     GET /api/v1/user/price
// @access    Private
exports.sumUserBookingHours = async (req, res, next) => {
    try {
        const userTotalHours = await History.aggregate([
            {
                $group: {
                    _id: "$user",
                    totalHours: { $sum: "$hour" }
                }
            },
            {
                $lookup: {
                    from: "users", // Assuming your users collection is named "users"
                    localField: "_id",
                    foreignField: "_id",
                    as: "userDetails"
                }
            },
            {
                $addFields: {
                    user: { $arrayElemAt: ["$userDetails.name", 0] },
                    userId: { $arrayElemAt: ["$userDetails._id", 0] }
                }
            },
            {
                $project: {
                    _id: 0,
                    user: 1,
                    userId: 1,
                    totalHours: 1
                }
            },
            {
                $sort: { totalHours: -1 } // Sort by totalHours in descending order
            },
            {
                $limit: 10 // Limit the result to 10 documents
            }
        ]);

        res.status(200).json({
            success: true,
            data: userTotalHours
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Cannot get User's total booking hours"
        });
    }
};



// @desc      Get all sum of user's booking price
// @route     GET /api/v1/user/price
// @access    Private
exports.getUserSortByPrice = async (req, res, next) => {
    try {
        // Fetch users from the database and sort them by the 'price' field in ascending order
        // and limit the result to the first 5 users
        const users = await User.find()
                                .sort({ points: -1 })
                                .limit(10)
                                .select('id name points');
                                
        // Send the successful response with the data
        res.status(200).json({
            success: true,
            data: users
        });
    } catch (error) {
        // Handle any errors and send a response with a 500 status code
        res.status(500).json({
            success: false,
            message: "Cannot get Users"
        });
    }
};