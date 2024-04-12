const User = require('../models/User');

//Get token from model, create cookie and send response
const sendTokenResponse = (user, statusCode, res) => {
    //Creaet token
    const token = user.getSignedJwtToken();

    const options = {
        expires: new Date(Date.now() + process.env.JWT_COOKIE_EXPIRE*24*60*60*1000),
        httpOnly: true
    };
    if (process.env.NODE_ENV==='production'){
        options.secure = true;
    }
    res.status(statusCode).cookie('token',token,options).json({
        success: true,
        token
    })
};

//@desc     Register user
//@route    POST /api/v1/auth/register
//@access   Public
exports.register = async (req,res,next) => {
    try{
        const {name,telephone_number,email,password,role} = req.body;

        //Create user
        const user = await User.create({
            name,
            telephone_number,
            email,
            password,
            role
        });

        //Create token
        // const token = user.getSignedJwtToken();
        // res.status(200).json({success:true,token});
        sendTokenResponse(user,200,res);
    } catch (err){
        res.status(400).json({success:false});
    }
};

//@desc     Login user
//@route    POST /api/v1/auth/login
//@access   Public
exports.login = async (req,res,next) => {
    const {email,password} = req.body;

    //Validate email and password
    if(!email || !password){
        return res.status(400).json({
            success: false,
            msg: 'Please provide an email and password'
        });
    }

    //Check for user
    const user = await User.findOne({email}).select('password');
    if(!user){
        return res.status(400).json({
            success: false,
            msg: 'Invalid credentials'
        });
    }

    //Check if password matches
    const isMatch = await user.matchPassword(password);

    if(!isMatch){
        return res.status(401).json({
            success: false,
            msg: 'Invalid credentials'
        });
    }

    //Create token
    //const token = user.getSignedJwtToken();
    // res.status(200).json({
    //     success: true, 
    //     token
    // });
    sendTokenResponse(user,200,res);
}

//@desc     Get current Logged in user
//@route    POST /api/v1/auth/me
//@access   Private
exports.getMe = async(req,res,next) => {
    const user = await User.findById(req.user.id);
    res.status(200).json({
        success: true,
        data: user
    });
};

exports.logout = async (req,res,next) => {
    res.cookie('token','none',{
        expires: new Date(Date.now() + 10*1000),
        httpOnly: true
    });

    res.status(200).json({
        success: true,
        data: {}
    });
}

// @desc    Update user points
// @route   PUT /api/v1/auth/updatepoints
// @access  Private
exports.updatePoints = async (req, res, next) => {
    try {
        const user = await User.findByIdAndUpdate(req.user.id,req.body, {
            new : true,
            runValidators : true
        });
        if (!user) {
            return res.status(404).json({
                success: false,
                error: 'No user found'
            });
        }
        res.status(200).json({
            success: true,
            data: user
        });
    } catch (err) {
        res.status(400).json({ success: false });
    }
    
};

// @desc    Add coupon to user
// @route   PUT /api/v1/auth/addcoupon
// @access  Private
exports.addCoupon = async (req, res, next) => {
    try {
        const user = await User.findByIdAndUpdate(
            req.user.id,
            { $push: { coupons: { couponName: req.body.couponName, couponCode: req.body.couponCode } } },
            {
                new : true,
                runValidators : true
            }
        ).catch(err => console.log(err));

        if (!user) {
            return res.status(404).json({
                success: false,
                error: 'No user found'
            });
        }

        const updatedUser = await User.findById(req.user.id);

        res.status(200).json({
            success: true,
            data: updatedUser
        });
    } catch (err) {
        res.status(400).json({ success: false });
    }
};

// @desc    Delete coupon from user
// @route   DELETE /api/v1/auth/deletecoupon
// @access  Private
exports.deleteCoupon = async (req, res, next) => {
    try {
        const user = await User.findByIdAndUpdate(
            req.user.id,
            { $pull: { coupons: { couponCode: req.body.couponCode } } }, // remove coupon from coupons array
            {
                new : true,
                runValidators : true
            }
        );

        if (!user) {
            return res.status(404).json({
                success: false,
                error: 'No user found'
            });
        }

        const updatedUser = await User.findById(req.user.id);

        res.status(200).json({
            success: true,
            data: updatedUser
        });
    } catch (err) {
        res.status(400).json({ success: false });
    }
};