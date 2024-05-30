const express = require('express');
const criterion211 = require('../models/Criterion2.1.1');
const router = express.Router();

router.post('/', async (req, res) => {
    try {
        console.log(req.body);
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
        console.error('Error saving data:', error);
        res.status(500).json({ message: 'Error saving data', error });
    }

    router.get('/', async (req, res) => {
      try {
          const data = await Criterion211.find({});
          res.status(200).json(data);
          console.log(data)
      } catch (error) {
          console.error('Error fetching data:', error);
          res.status(500).json({ message: 'Error fetching data', error });
      }
  });
});

module.exports = router;
