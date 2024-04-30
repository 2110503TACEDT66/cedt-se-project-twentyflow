const express = require('express');
const  dotenv = require('dotenv');
const cookieParser = require('cookie-parser')
const connectDB = require('./config/db')
const mongoSanitize =require('express-mongo-sanitize')
const helmet = require('helmet')
const {xss} = require('express-xss-sanitizer')
const rateLimit = require("express-rate-limit")
const hpp = require('hpp')
const cors = require('cors')
const auth = require('./routes/auth');
const rankingRouter = require('./routes/ranking');
const swaggerJsDoc = require('swagger-jsdoc');
const swaggerUI = require('swagger-ui-express');

const swaggerOptions={
    swaggerDefinition:{
        openapi: '3.0.0',
        info: {
            title: 'CEDT CO-WORKING API',
            version: '1.0.0',
            description: 'CEDT CO-WORKING API',
        },
        servers:
            [
                {
                    url: 'http://localhost:5000/api/v1'
                }
            ],
        components: {
            securitySchemes: {
                bearerAuth: {
                    type: 'http',
                    scheme: 'bearer',
                    bearerFormat: 'JWT',
                }
            }
        }
    },
    
    apis:['./routes/*.js'],
    
};

//Load env vars
dotenv.config({path:'./config/config.env'});

//Connect to database
connectDB()

//Route files
const coWorking = require('./routes/coWorkings');
const appointments = require('./routes/appointments');
const history = require('./routes/history');
const dashboard = require('./routes/dashboard');
const coupon = require('./routes/coupon');
const reward = require('./routes/reward');
const payment = require('./routes/stripe');
const users = require('./routes/user');
const room = require('./routes/room');
const app = express();

//Body parser
app.use(express.json());


//Cookie parser
app.use(cookieParser());


app.use(mongoSanitize());

//Set Security headers
app.use(helmet());

//Prevent XSS attacks
app.use(xss());

//Rate Limiting
const limiter = rateLimit({
    window: 10*60*1000, //10 mins
    max : 50000
})
app.use(limiter);

//Prevent http param pollutions
app.use(hpp());

//Enable CORS
app.use(cors());

//Route files
app.use('/api/v1/coworkings',coWorking);
app.use('/api/v1/auth',auth);
app.use('/api/v1/appointments', appointments)
app.use('/api/v1/history', history)
app.use('/api/v1/dashboard', dashboard)
app.use('/api/v1/coupon',coupon);
app.use('/api/v1/reward',reward);
app.use('/api/v1/payment',payment);
app.use('/api/v1/user',users);
app.use('/api/v1/room',room);

app.use('/api/v1/ranking',rankingRouter);

const swaggerDocs=swaggerJsDoc(swaggerOptions);
app.use('/api-docs',swaggerUI.serve, swaggerUI.setup(swaggerDocs));



const PORT = process.env.PORT || 5000;

const server = app.listen(PORT, console.log('Server runnig in ',process.env.NODE_ENV, 'mode on ' + process.env.HOST + '/api/v1'));

//Handle unhandled promise rejections
process.on('unhandledRejection',(err,promise)=>{
    console.log(`Error : ${err.message}`);
    //Close server $ exit process
    server.close(()=>process.exit(1));
})
