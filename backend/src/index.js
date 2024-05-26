const express = require('express');
const dotenv = require('dotenv');
const bodyParser = require('body-parser');
const cors = require('cors');
const connectDB = require('../db/index.js');
const criterianRoutes = require('../routes/routes');
const criterionRoute211 = require('../routes/criterion2.1.1')
const criterionRoute222 = require('../routes/criterion2.2.2')
const criterionRoute231 = require('../routes/criterion2.3.1')
const criterionRoute232 = require('../routes/criterion2.3.2')
const criterionRoute233 = require('../routes/criterion2.3.3')
const criterionRoute241 = require('../routes/criterion2.4.1')
const criterionRoute242 = require('../routes/criterion2.4.2')
const criterionRoute244 = require('../routes/criterion2.4.4')
const criterionRoute251 = require('../routes/criterion2.5.1')
const criterionRoute252 = require('../routes/criterion2.5.2')

// Load environment variables from .env file
dotenv.config();

const app = express();
const PORT = 5173;

app.use(cors());

app.use(express.json())
app.use('/api/criterion1.1.1',criterianRoutes)
app.use('/api/criterion2.1.1',criterionRoute211)
app.use('/api/criterion2.2.2',criterionRoute222)
app.use('/api/criterion2.3.1',criterionRoute231)
app.use('/api/criterion2.3.2',criterionRoute232)
app.use('/api/criterion2.3.3',criterionRoute233)
app.use('/api/criterion2.4.1',criterionRoute241)
app.use('/api/criterion2.4.2',criterionRoute242)
app.use('/api/criterion2.4.4',criterionRoute244)
app.use('/api/criterion2.5.1',criterionRoute251)
app.use('/api/criterion2.5.2',criterionRoute252)





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
