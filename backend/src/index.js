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
const criterionRoute2521 = require('../routes/criterionRoute2.5.2')
const criterionRoute253 = require('../routes/criterion2.5.3')
const criterionRoute254 = require('../routes/criterion2.5.4')
const criterionRoute262 = require('../routes/criterion2.6.2')
const criterionRoute263 = require('../routes/criterion2.6.3')
const criterionRoute112 = require('../routes/criterion1.1.2')
const criterionRoute113 = require('../routes/criterion1.1.3')
const criterionRoute121 = require('../routes/criterion1.2.1')
const criterionRoute122 = require('../routes/criterion1.2.2')
const criterionRoute132 = require('../routes/criterion1.3.2')
const criterionRoute133 = require('../routes/criterion1.3.3')


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
app.use('/api/criterionRoute2.5.2',criterionRoute2521)
app.use('/api/criterion2.5.3',criterionRoute253)
app.use('/api/criterion2.5.4',criterionRoute254)
app.use('/api/criterion2.6.2',criterionRoute262)
app.use('/api/criterion2.6.3',criterionRoute263)
app.use('/api/criterion1.1.2',criterionRoute112)
app.use('/api/criterion1.1.3',criterionRoute113)
app.use('/api/criterion1.2.1',criterionRoute121)
app.use('/api/criterion1.2.2',criterionRoute122)
app.use('/api/criterion1.3.2',criterionRoute132)
app.use('/api/criterion1.3.3',criterionRoute133)



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
