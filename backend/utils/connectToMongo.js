import mongoose from 'mongoose';
import dotenv from 'dotenv';

dotenv.config();

let MONGODB_URI;



switch(process.env.NODE_ENV){
    case "development":
        MONGODB_URI = process.env.MONGODB_URI_DEVELOPMENT
        break;
    case "production":
        MONGODB_URI = process.env.MONGODB_URI_PRODUCTION
        break;
    default:
        MONGODB_URI = process.env.MONGODB_URI_DEVELOPMENT
}

const connectToMongo = async() => {
    try{
        const conn = await mongoose.connect(MONGODB_URI, {
            useCreateIndex: true,
            useNewUrlParser: true,
            useFindAndModify: false,
            useUnifiedTopology: true
        })
    
        console.log(`MongoDB successfully connected to ${conn.connection.host}`)
    }
    catch(error){
        console.error(error);
        process.exit(1);
    }
} 

export default connectToMongo;