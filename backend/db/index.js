// import mongoose from "mongoose";
// import { DB_NAME } from "../src/constant";

// const connectDB = async() => {
//     try {
//         const connectionINstance = await mongoose.connect(`${process.env.MONGODB_URI}/${DB_NAME}`)
//         console.log(`DB Connected ${connectionINstance.connect.host}`);
        
//     } catch (error) {
//         console.log("MongoDb connection error", error)
//         process.exit(1)
//     }
// }

// export default connectDB

import mongoose from "mongoose";
import { DB_NAME } from "../src/constant.js";

const connectDB = async () => {
    try {
        const connectionINstance = await mongoose.connect(`${process.env.MONGODB_URI}/${DB_NAME}`)
        console.log(`DB Connected ${connectionINstance.connect.host}`);
        
    } catch (error) {
        console.log("MongoDB connection error:", error);
        process.exit(1);
    }
};

export default connectDB
