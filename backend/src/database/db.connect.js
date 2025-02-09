import mongoose from "mongoose";
import DBName from "../constant.js";

const connectDB = async () => {
    try {
        const connectionInstance = await mongoose.connect(`${process.env.MONGODB_URL}/${DBName}`)
        console.log(`MongoDB connected :: ${connectionInstance.connection.host}`)
    } catch (error) {
        console.error(`MongoDB connection ERROR :: ${error?.message}`);
    }
}

export default connectDB