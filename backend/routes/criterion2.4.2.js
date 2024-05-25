// routes/criterion2.4.2.js
const express = require('express');
const Criterion242 = require('../models/Criterion2.4.2');
const router = express.Router();

router.post('/', async (req, res) => {
    try {
        console.log(req.body);
        const {
            'Academic Year': academicYear,
            'Name of the Teacher': name,
            'Maximum Qualification': maximumQualification,
            'Any Additional Information': additionalInformation
        } = req.body;

        const newCriterion242 = new Criterion242({
            academicYear,
            name,
            maximumQualification,
            additionalInformation
        });

        await newCriterion242.save();
        res.status(201).json({ message: 'Data saved successfully' });
    } catch (error) {
        console.error('Error saving data:', error);
        res.status(500).json({ message: 'Error saving data', error });
    }
});

module.exports = router;
