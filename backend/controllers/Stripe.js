const Stripe = require('stripe');
const dotenv = require('dotenv');
const Appointment = require('../models/Appointment');
const User = require('../models/User')


dotenv.config({path:'./config/config.env'});

const stripe = new Stripe(String(process.env.STRIPE_SECRET_KEY));

exports.createCustomer = async (email,name,id_mongo)=>{
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

exports.getUserInfo = async (req,res,next) => {
    try {
        const customer = await User.findById(req.params.id);
        const customerId = customer.customerId;

        const cus = await stripe.customers.retrieve(customerId)
        const cardID = cus.default_source

        const number = await stripe.paymentMethods.retrieve(cardID);



        res.status(200).json({
            success:true, 
            data:number.card
            })
    } catch(err) {
        res.status(404).json({success:false, error:err.message});
    }
}

exports.updateCustomer = async (req, res, next) => {
    try {
        const customer = await User.findById(req.params.id);

        if (!customer) {
            return res.status(400).json({ success: false, message: "Customer not found" });
        }

        const { token } = req.body;

        const updatedCustomer = await stripe.customers.update(
            customer.customerId,
            { source: token }
        );

        return res.status(200).json({ success: true, message: "Customer payment source updated successfully" });
    } catch (err) {
        return res.status(500).json({
            success: false,
            message: err.message
        });
    }
};



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
        const { appointmentId } = req.body;

        if (!appointmentId)
            return res.status(400).json({
                success: false,
                message: 'Invalid appointment ID'
            });

        const appointment = await Appointment.findById(appointmentId).populate({
            path: 'coWorking',
            select: 'name province tel price_hourly'
        });

        if (!appointment)
            return res.status(400).json({
                success: false,
                message: 'Appointment not found'
            });

        if (appointment.status === 'finished')
            return res.status(400).json({
                success: false,
                message: 'This appointment is already paid'
            });

        if (req.user.id !== appointment.user.toString() && req.user.role !== 'admin') {
            return res.status(400).json({
                success: false,
                message: 'Unauthorized: Not the same user'
            });
        }

        const appId = appointment._id;

        const customer = await stripe.customers.retrieve(stripeCustomerId);

        if (!customer || !customer.default_source) {
            return res.status(400).json({
                success: false,
                message: 'Customer has no default payment method'
            });
        }

        const session = await stripe.checkout.sessions.create({
            mode: "payment",
            payment_method_types: ["card","promptpay"],
            line_items: [{
                price: appointment.priceId,
                quantity: 1,
            }],    
            allow_promotion_codes: true,
            success_url: `http://localhost:3000/payment/${appId}&${appointment.coWorking.price_hourly * (Math.ceil((new Date(appointment.endTime).getTime() - new Date(appointment.startTime).getTime())/( 1000*60*60) ))   }/success`,
            cancel_url: `http://localhost:3000/payment/${appId}/cancel`,
            customer: stripeCustomerId,
        });

        res.status(200).json({
            success: true,
            sessionUrl: session.url,
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({
            success: false,
            error: error.message,
        });
    }
};
