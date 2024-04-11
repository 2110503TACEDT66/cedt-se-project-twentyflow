//@desc      Get all history
//@route     GET /api/v1/history
//@access    Public
exports.getHistory=async (req,res,next) =>{
    let query;
    if(req.user.role==='user'){
        query=History.find({user:req.user.id}).populate({
            path:'coWorking',
            select: 'name province tel'
        }
        ).populate({
            path:'user',
            select: 'name'
            } )  ;
    }else{
        query=History.find().populate({
            path:'coWorking' ,
            select: 'name province tel'
        }).populate({
            path:'user',
            select: 'name'
        }) ;
    }
    try {
        const history= await query;

        res.status(200).json({
            success:true,
            count:history.length,
            data: history
        });
    } catch (err) {
        return res.status(500).json({success:false,message:"Cannot find History"});
    }
}


//@desc     Add history
//@route    POST /api/v1/history
//@access   Private
exports.addHistory=async (req,res,next)=>{
    req.body.user=req.user.id;
    try {
        const history=await History.create(req.body);
        res.status(201).json({
            success:true,
            data: history
        });
    } catch (error) {
        res.status(400).json({success:false});
    }
};