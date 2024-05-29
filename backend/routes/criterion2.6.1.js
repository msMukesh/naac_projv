const express = require('express');
const Criterian = require('../models/Criterion2.6.1');
const bodyParser = require('body-parser')
const router = express.Router();
const criterionTab1 = require('../models/CriterionSchema1.1.2');
const criterion211 = require('../models/Criterion2.1.1');

router.use(express.json());



router.post('/', async (req, res) => {
    try {
        console.log(req.body)
        const { longText } = req.body;
        console.log('data',{longText})
        const newCriterian = new Criterian({ longText });
        
        await newCriterian.save();
        res.status(201).json({ message: 'Data saved successfully' });
    } catch (error) {
        res.status(500).json({ message: 'Error saving data', error });
    }
});


module.exports = router;
