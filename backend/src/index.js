const express = require('express');
const dotenv = require('dotenv');
const connectDB = require('../db/index.js');

// Load environment variables from .env file
dotenv.config();

const app = express();

// Connect to the database
connectDB()
    .then(() => {
        const port = process.env.PORT || 8000;
        app.listen(port, () => {
            console.log(`Server is running at: ${port}`);
        });
    })
    .catch((err) => {
        console.log("MongoDB Connection failed!!!", err);
    });
