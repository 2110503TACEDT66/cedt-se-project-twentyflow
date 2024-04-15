const History = require('../models/History');

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
        });
    }else{
        //If you are an admin, you can see all!
        if(req.params.coWorkingId) {
            query= await History.find({coWorking:req.params.coWorkingId}).populate({
                path: 'coWorking' ,
                select: 'name address tel',

            }).populate({
                path:'user',
                select: 'name'
            });

        }else {
            query= await History.find().populate({
                path:'coWorking' ,
                select: 'name address tel'
            }).populate({
                path:'user',
                select: 'name'
            });

        }

    }
    try {
        const histories=  query;
        res.status(200).json({
            success:true,
            count:histories.length,
            data: histories
        });
    } catch (error) {
        return res.status(500).json({success:false,message:"Cannot find History"});
    }
};

exports.getHistory = async (req, res, next) => {
    try {
        const history = await History.findById(req.params.id).populate({
            path: 'coWorking',
            select: 'name address tel'
        }).populate({
            path: 'user',
            select: 'name'
        });

        if (!history) {
            return res.status(404).json({
                success: false,
                message: "Cannot find History"
            });
        }
        res.status(200).json({
            success: true,
            data: history
        });
    } catch (error) {
        return res.status(500).json({success:false,message:"Cannot find History"});
    }
};
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
        });


        res.status(200).json({
            success: true,
            data: history
        });

    } catch (error) {
        return res.status(500).json({success:false,message:"Cannot update History"});
    }
}
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
