const express = require('express');
const Criterian231 = require('../models/Criterion2.3.1');
const bodyParser = require('body-parser')
const router = express.Router();

router.use(express.json());



router.post('/', async (req, res) => {
    try {
        console.log(req.body)
        const { longText } = req.body;
        console.log('data',{longText})
        const newCriterian = new Criterian231({ longText });
        
        await newCriterian.save();
        res.status(201).json({ message: 'Data saved successfully' });
    } catch (error) {
        res.status(500).json({ message: 'Error saving data', error });
    }
});


module.exports = router;
