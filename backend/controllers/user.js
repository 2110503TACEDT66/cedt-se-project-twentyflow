//update user name,email
// update user name, email
const User = require('../models/User');
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