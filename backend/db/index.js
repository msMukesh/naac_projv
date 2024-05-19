const mongoose = require("mongoose");
const dotenv = require("dotenv");

// Load environment variables from .env file
dotenv.config();

const connectDB = async () => {
    try {
        const uri = process.env.MONGODB_URI;
        const connectionInstance = await mongoose.connect(uri);
        console.log(`DB Connected to ${connectionInstance.connection.host}`);
    } catch (error) {
        console.log("MongoDB connection error:", error);
        process.exit(1);
    }
};

module.exports = connectDB;
