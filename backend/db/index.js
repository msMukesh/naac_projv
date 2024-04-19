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

const connectDB = async () => {
    try {
        const uri = "mongodb+srv://msmukesh2001:naacdb123@naac.kcdpff4.mongodb.net/?retryWrites=true&w=majority&appName=Naac";
        const connectionInstance = await mongoose.connect(uri, {
            useNewUrlParser: true,
            useUnifiedTopology: true
        });
        console.log(`DB Connected to ${connectionInstance.connection.host}`);
    } catch (error) {
        console.log("MongoDB connection error:", error);
        process.exit(1);
    }
};

export default connectDB
