import mongoose from "mongoose";
import { DB_NAME } from "../src/constant.js";

const connectDB = async () => {
    try {
        await mongoose.connect(process.env.MONGODB_URI, {
            dbName: DB_NAME,
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });
        console.log(`DB Connected to ${mongoose.connection.host}:${mongoose.connection.port}/${DB_NAME}`);
        
    } catch (error) {
        console.error("MongoDB connection error:", error);
        process.exit(1);
    }
};

export default connectDB;
