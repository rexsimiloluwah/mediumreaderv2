import express from 'express';
import path from 'path';
import bodyParser from 'body-parser';
import cookieParser from 'cookie-parser';
import HttpError from './errors/HttpError';
import connectToMongo from './utils/connectToMongo';
import dotenv from 'dotenv';
import {MainRouter} from './routes';

/* Initialize Express app */
const app = express();

dotenv.config();

/* Middlewares */
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended : true}));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

/* Connect to Database (MongoDB) */
let MONGODB_URI = process.env.NODE_ENV;

switch(MONGODB_URI){
    case "development":
        MONGODB_URI = process.env.MONGODB_URI_DEVELOPMENT
        break;
    case "production":
        MONGODB_URI = process.env.MONGODB_URI_PRODUCTION
        break;
    default:
        MONGODB_URI = process.env.MONGODB_URI_DEVELOPMENT
}

connectToMongo(MONGODB_URI);

/* Handling CORS */
app.use((req,res,next) => {
    res.header("Access-Control-Allow-Origin", "*")
    res.header("Access-Control-Allow-Headers", "*")
    
    if (req.method === "OPTIONS"){
        res.header("Access-Control-Allow-Methods", "PUT, POST, PATCH, DELETE, GET")
        return res.status(200).json({})
    }

    next()
})

/* Routes */
app.use("/api/v1/audio", MainRouter);

/* Use React client app for to serve static files */
// if(process.env.NODE_ENV === "production"){
//     /* Set build folder */
//     app.use(express.static('client/build'));

//     app.get('*', (req,res) => {
//         res.sendFile(path.resolve(__dirname,'client','build','index.html'));
//     })
// }

/* Error Handling from Routes */
app.use((req,res,next) => {
    const error = new HttpError("Could not find specified route.", 404);
    throw error;
})

app.use((error,req,res,next) => {
    if(res.headerSent){
        return next(error);
    }

    // req.setTimeout(1000000, ()=>{
    //     return next("Request Timeout!");
    // })

    return res.status(error.code || 500).json({
        error : error.message || "An unknown error occurred."
    })
})

export default app;