const express = require('express');
const dotenv = require('dotenv');
const bodyParser = require('body-parser');
const cors = require('cors');
const connectDB = require('../db/index.js');
const criterianRoutes = require('../routes/routes');
const criterionroute211 = require('../routes/criterion2.1.1')
// Load environment variables from .env file
dotenv.config();

const app = express();
const PORT = 5173;

app.use(cors());

app.use(express.json())
app.use('/api/criterion1.1.1',criterianRoutes)
app.use('/api/criterion2.1.1',criterionroute211)


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
