const express = require('express');
const Criterian = require('../models/Criterian1.1.1');
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

//for criterion1.1.2 

router.post('/critrion2.1.1', async (req, res) => {
    try {
        const {
          'Academic Year': academicYear,
          'Name of the programme': nameOfProgram,
          'Number of seats Available': numberOfSeatsAvailable,
          'Number of Eligible Applications Received': numberOfEligibleApplicationsReceived,
          'Number of Seats filled': numberOfSeatsFilled
        } = req.body;
    
        const newCriterian = new criterion211({
          academicYear,
          nameOfProgram,
          numberOfSeatsAvailable,
          numberOfEligibleApplicationsReceived,
          numberOfSeatsFilled
        });
    
        await newCriterian.save();
        res.status(201).json({ message: 'Data saved successfully' });
      } catch (error) {
        res.status(500).json({ message: 'Error saving data', error });
      }
});

module.exports = router;
