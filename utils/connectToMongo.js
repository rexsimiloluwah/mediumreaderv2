import mongoose from 'mongoose';

/**@param
 * 
 */
const connectToMongo = async(MONGODB_URI) => {
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