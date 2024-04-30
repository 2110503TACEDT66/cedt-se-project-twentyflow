const History = require('../models/History');
const Appointment = require('../models/Appointment');

//@desc      Get all histories
//@route     GET /api/v1/histories
//@access    Private
exports.getHistories = async (req, res, next) => {
    let query;

    //General users can see only their histories!
    if (req.user.role !== 'admin') {
        query = await History.find({ user: req.user.id }).populate({
            path: 'coWorking',
            select: 'name address tel'
        }
        ).populate({
            path: 'user',
            select: 'name'
        }).populate({
            path: 'appointment',
            select: 'startTime endTime date room  additional'
        }).sort({createdAt: -1});
    }else{
        //If you are an admin, you can see all!
        if(req.params.coWorkingId) {
            query= await History.find({coWorking:req.params.coWorkingId}).populate({
                path: 'coWorking' ,
                select: 'name address tel',

            }).populate({
                path:'user',
                select: 'name'
            }).populate({
                path: 'appointment',
                select: 'startTime endTime date room  additional'
            })
            .sort({createdAt: -1});

        }else {
            query= await History.find().populate({
                path:'coWorking' ,
                select: 'name address tel'
            }).populate({
                path:'user',
                select: 'name'
            }).populate({
                path: 'appointment',
                select: 'startTime endTime date room  additional'
            })
            .sort({createdAt: -1});

        }

    }
    try {
        const histories= query;
        res.status(200).json({
            success:true,
            count:histories.length,
            data: histories
        });
    } catch (error) {
        return res.status(500).json({success:false,message:"Cannot find History"});
    }
};

//@desc      Get single history
//@route     GET /api/v1/history/:id
//@access    Private
exports.getHistory = async (req, res, next) => {
    try {

        const history = await History.findById(req.params.id).populate({
            path: 'coWorking',
            select: 'name address tel'
        }).populate({
            path: 'user',
            select: 'name'
        }).populate({
            path: 'appointment',
            select: 'startTime endTime date room  additional'
        })
        .sort({createdAt: -1});

        if (!history) {
            return res.status(404).json({
                success: false,
                message: "Cannot find History"
            });
        }
        res.status(200).json({
            success: true,
            HistoryDetails: history,
        });
    } catch (error) {
        return res.status(500).json({success:false,message:error.message});
    }
};

//@desc      Add history
//@route     POST /api/v1/history
//@access    Private
exports.addHistory = async (req, res, next) => {
    try {
        const history = await History.create(req.body);
        res.status(201).json({
            success: true,
            data: history
        });
    } catch (error) {
        return res.status(500).json({success:false,message:"Cannot add History"});
    }
};

//@desc      Update history
//@route     PUT /api/v1/history/:id
//@access    Private
exports.updateHistory = async (req, res, next) => {
    try {
        let history = await History.findById(req.params.id);
        

        if (!history) {
            return res.status(404).json({
                success: false,
                message: "Cannot find History"
            });
        }

        //Make sure user is the history owner
        if(history.user.toString() !== req.user.id && req.user.role !== 'admin'){
            return res.status(401).json({
                success:false,
                message:`User ${req.user.id} is not authorized to update this history`
            });
        }

        history = await History.findByIdAndUpdate(req.params.id, req.body, { 
            new: true, 
            runValidators: true 
        }).populate({
            path: 'coWorking',
            select: 'name address tel'
        }).populate({
            path: 'user',
            select: 'name'
        }).populate({
            path: 'appointment',
            select: 'startTime endTime date room  additional'
        });


        res.status(200).json({
            success: true,
            data: history
        });

    } catch (error) {
        return res.status(500).json({success:false,message:"Cannot update History"});
    }
}

//@desc      Delete history
//@route     DELETE /api/v1/history/:id
//@access    Private
exports.deleteHistory = async (req, res, next) => {
    try {
        const history = await History.findById(req.params.id);
        if (!history) {
            return res.status(404).json({
                success: false,
                message: "Cannot find History"
            });
        }
        history.remove();
        res.status(200).json({
            success: true,
            message: "History is deleted"
        });
    } catch (error) {
        return res.status(500).json({success:false,message:"Cannot delete History"});
    }
};

