const Reward = require('../models/Reward');

//@desc      Create reward
//@route     POST /api/v1/reward
//@access    Private
exports.createReward = async (req,res,next) => {
    try {
        const reward = await Reward.create(
            {
                user: req.user.id,
                rewardName: req.body.rewardName,
                rewardPoint: req.body.rewardPoint
            }
        );
        res.status(200).json({
            success: true,
            data: reward
        });
    } catch (err) {
        console.log(err);
        res.status(400).json({ success: false });
    }
}

//@desc      Get rewards
//@route     GET /api/v1/reward
//@access    Private
exports.getRewards = async (req,res,next) => {
    try {
        const rewards = await Reward.find({ user: req.user.id}).sort({createdAt: -1});
        res.status(200).json({
            success: true,
            count: rewards.length,
            data: rewards
        });
    } catch (err) {
        res.status(400).json({ success: false });
    }
}