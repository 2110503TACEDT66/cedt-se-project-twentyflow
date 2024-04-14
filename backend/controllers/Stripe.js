const Stripe = require('stripe');
const dotenv = require('dotenv');
const Appointment = require('../models/Appointment');

dotenv.config({path:'./config/config.env'});

const stripe = new Stripe(String(process.env.STRIPE_SECRET_KEY));

exports.createCustomer = async (email,name)=>{
    try {
        const customer = await stripe.customers.create({
          email: email,
          name: name,
        });
        return customer;
    } catch (err) {
        console.error(err.message);
        return null;
    }
}

exports.getPrices = async (req,res,next)=>{
    try{
        const products = await stripe.products.list();
        const prices = await stripe.prices.list();

        res.status(200).json({
            success:true,
            products:products,
            prices:prices,
        });
    }
    catch(err){
        res.status(400).json({
            success:false,
            error: err.message
        });
    }
};

exports.createPrice = async (req,res,next)=>{
    try{
        const {name,description,amount} = req.body;

        const product = await stripe.products.create({
            name:name,
            description:description,
        });

        const price = await stripe.prices.create({
            product: product.id,
            unit_amount: amount,
            currency: "thb",
        });

        res.status(200).json({
            success: true,
            message: "Product and price created successfully",
            product: product,
            price: price
        });
    }
    catch(err){
        res.status(400).json({
            success:false,
            error: err.message
        });
    }
};

exports.createPaymentSession = async (req, res) => {
    try {
        const stripeCustomerId = req.user.customerId;
        const {appointmentId} = req.body;

        if(!appointmentId)
            return res.status(400).json({
                success:false,
                message:'Invalid appointment ID'
            });
        
        const appointment = await Appointment.findById(appointmentId);

        if(!appointment)
            return res.status(400).json({
                success:false,
                message:'Not found appointment'
            });

        if(appointment.status === 'finished')
            return res.status(400).json({
                success:false,
                message:'This appointment is paid'
            });

        if(req.user.id !== appointment.user.toString() && req.user.role !== 'admin'){
            console.log(req.user.id);
            console.log(appointment.user.id.toString());
            return res.status(400).json({
                success:false,
                message:'Not same user'
            });
        }

        const session = await stripe.checkout.sessions.create({
            mode: "payment",
            payment_method_types: ["promptpay","card"], 
            line_items: [{
                price: appointment.priceId,
                quantity: 1,
            }],
            success_url: `http://localhost:3000/payment/${appointment._id}/success`,
            cancel_url: `http://localhost:3000/payment/${appointment._id}/cancel`,
            customer: stripeCustomerId,
        });

        appointment.status = 'finished';
        await appointment.save();
  
        res.status(200).json({
            success: true,
            sessionUrl: session.url,
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({
            success: false,
            error: error.message,
        });
    }
};