const Appointment = require('../models/Appointment');
const CoWorking = require('../models/CoWorking');
const Room = require('../models/Room');
const Stripe = require('stripe');

const stripe = new Stripe(String(process.env.STRIPE_SECRET_KEY));

//@desc      Get unfinished appointments
//@route     GET /api/v1/appointments
//@access    Public
exports.getAppointments=async (req,res,next)=>{
    let query;
    //General users can see only their appointments!
    if(req.user.role !== 'admin'){
        query=Appointment.find({user:req.user.id,status:"unfinished"}).populate({
            path:'coWorking',
            select: 'name province tel price_hourly'
        }
        ).populate({
            path:'user',
            select: 'name'
            } )  ;
    }else{
        //If you are an admin, you can see all!
        if(req.params.coWorkingId) {
            query=Appointment.find({coWorking:req.params.coWorkingId,status:"unfinished"}).populate({
                path: 'coWorking' ,
                select: 'name province tel price_hourly',

            }).populate({
                path:'user',
                select: 'name'
                } ) ;
        }else {
            query=Appointment.find({status:"unfinished"}).populate({
                path:'coWorking' ,
                select: 'name province tel price_hourly'
            }).populate({
                path:'user',
                select: 'name'
            }) ;
        }
        
    }
    try {
        const appointments= await query;

        res.status(200).json({
            success:true,
            count:appointments.length,
            data: appointments
        });
    } catch (err) {
        return res.status(500).json({success:false,message:"Cannot find Appointment"});
    }
}

//@desc      Get single appointments
//@route     GET /api/v1/appointments/:id
//@access    Public
exports.getAppointment=async (req,res,next) =>{
    try {
        const appointment = await Appointment.findById(req.params.id).populate({
            path:'coWorking' ,
            select: 'name province tel price_hourly '
        }).populate({
            path:'user',
            select: 'name'
        }).populate({
            path:'room',
            select: 'roomNumber capacity'
        
        });

        if (!appointment){
            return res.status(404).json({success:false,message:`No appointment with the id of ${req.params.id}`});
        }
        if (req.user.role !== 'admin' && appointment.user.id !== req.user.id){
            return res.status(401).json({success:false,message:`User cannot access this appointment`});
        }

        res.status(200).json({
            success:true,
            data: appointment
        });
    } catch (error){
        return res.status(500).json({success:false,message:"Cannot find Appointment"});
    }
};

//@desc    Add appointment
//@route   POST /api/v1/coworkings/:coWorkingId/appointment
//@access  Private
exports.addAppointment=async (req,res,next)=>{
    try {
        const coWorking = await CoWorking.findById(req.params.coWorkingId);
        
        req.body.coWorking = req.params.coWorkingId;

        

        if(!coWorking){
            return res.status(404).json({success:false,message:`No coWorking with the id of ${req.params.coWorkingId}`});

        }
        //add user id to req.body
        req.body.user=req.user.id;




        if (!req.body.startTime || !req.body.endTime || !req.body.date || !req.body.room)
        {
            return res.status(400).json({success:false,message:"Please provide all the information"});
        }

        //Check for existed appointment
        const existedAppointment = await Appointment.find({user:req.user.id, status:"unfinished"});

        //If the user is not an admin, they can only create 3 appointment.
        if (existedAppointment.length >= 3 && req.user.role !== 'admin'){
            return res.status(400).json({success:false,message: `The user with ID ${req.user.id} has already made 3 appointments`});
        }

        const startTime = req.body.startTime;
        const endTime = req.body.endTime;

        const startHour = parseInt(startTime.split(":")[0])
        const endHour = parseInt(endTime.split(":")[0])
        const startMin = parseInt(startTime.split(":")[1])
        const endMin = parseInt(endTime.split(":")[1])
        let hourC = 0
        if(startMin < endMin){hourC += 1}
        hourC += endHour - startHour

        const products = await stripe.products.list();
        const prices = await stripe.prices.list();
        const duration = hourC;

        //filter product
        var foundProduct = false;
        var productId = "";
        for (let i = 0; i < products.data.length; i++) {
          if (
            products.data[i].name === coWorking.name &&
            products.data[i].description === String(duration)
          ) {
            foundProduct = true;
            productId = products.data[i].id;
            break;
          }
        }
  
        //find price
        let priceId = "";
        if (foundProduct) {
          for (let i = 0; i < prices.data.length; i++) {
            if (productId === prices.data[i].product)priceId = prices.data[i].id;
          }
        }else{
            const product = await stripe.products.create({
                name:coWorking.name,
                description:String(duration),
            });
    
            const price = await stripe.prices.create({
                product: product.id,
                unit_amount: String(coWorking.price_hourly * duration * 100),
                currency: "thb",
            });

            priceId = price.id;
        }

        req.body.priceId = priceId;

        const appointment = await Appointment.create(req.body);

        res.status(201).json({
            success:true,
            data: appointment
        });

    } catch (error) {
        return res.status(500).json({
            success:false,
            message:"Cannot create Appointment"
        });
    }
}

//@desc    Update appointment
//@route   PUT /api/v1/coWorkings/:id
//@access  Private
exports.updateAppointment=async (req,res,next)=>{
    try {
        let appointment = await Appointment.findById(req.params.id).populate({
            path:'user',
            select: 'name'
        });
        

        if(!appointment){
            return res.status(404).json({success:false,message:`No appointment with the id of ${req.params.id}`});
        }

        if (appointment.status === 'finished'){
            return res.status(400).json({success:false,message:`The appointment with the id of ${req.params.id} has already been finished`});
        }

        //Make sure user is the appointment owner
        if(appointment.user.id !== req.user.id && req.user.role !== 'admin'){
            return res.status(401).json({success:false,message:`User cannot access this appointment`});
        }

        appointment = await Appointment.findByIdAndUpdate(req.params.id, req.body,{
            new:true,
            runValidators:true
        }).populate({
            path:'coWorking' ,
            select: 'name province tel'
        });

        res.status(200).json({
            success:true,
            data: appointment
        });

    } catch (error) {
        return res.status(500).json({
            success:false,
            message:"Cannot update Appointment"
        });
    }
}

//@desc    Delete appointment
//@route   DELETE /api/v1/coWorkings/:id
//@access  Private
exports.deleteAppointment=async (req,res,next)=>{
    try {
        let appointment = await Appointment.findById(req.params.id).populate({
            path:'user',
            select: 'name'
        });

        if(!appointment ){
            return res.status(404).json({success:false,message:`No appointment with the id of ${req.params.id}`});
        }

        if (appointment.status === 'finished'){
            return res.status(400).json({success:false,message:`The appointment with the id of ${req.params.id} has already been finished`});
        }

        if(appointment.user.id !== req.user.id && req.user.role !== 'admin'){
            return res.status(401).json({success:false,message:`User cannot access this appointment`});
        }

        await appointment.deleteOne();

        res.status(200).json({
            success:true,
            data: {}
        });
    } catch (error) {
        return res.status(500).json({
            success:false,
            message:"Cannot delete Appointment"
        });
    }
}

//@desc    Get rooms
//@route   GET /api/v1/appointments/:roomId/appointments
//@access  Private
exports.getRoom=async (req,res,next)=>{
    try {
        const room = await Room.findById(req.params.roomId).populate({
            path:'appointments',
            select: 'startTime endTime date'
        }).sort({roomNumber:1});
        console.log(req.params.roomId)

        if (!room){
            return res.status(404).json({success:false,message:`No room with the id of ${req.params.roomId}`});
        }

        res.status(200).json({
            success:true,
            data: room
        });
    } catch (error){
        return res.status(500).json({success:false,message:"Cannot find Appointment"});
    }
}