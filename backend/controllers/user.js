//update user name,email
// update user name, email
const User = require('../models/User');
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

module.exports = {
    updateUserProfile,
};