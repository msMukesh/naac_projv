const express = require('express');
const Criterion113 = require('../models/Criterion1.1.3');
const router = express.Router();

router.post('/', async (req, res) => {
    try {
        console.log('Received data:', req.body);
        const {
            'Academic Year': academicYear,
            'Programme Code': programmeCode,
            'Names of the Course': courseNames,
            ' Activities with direct bearing on Employability/Entrepreneurship/Skill Development': activities,
            'Name of the Program': programName,
            'Copy of the Data Template': dataTemplate
        } = req.body;

        const newCriterion113 = new Criterion113({
            academicYear,
            programmeCode,
            courseNames,
            activities, // Ensure correct field mapping
            programName,
            dataTemplate
        });

        console.log('Saving data:', newCriterion113);
        await newCriterion113.save();
        res.status(201).json({ message: 'Data saved successfully' });
    } catch (error) {
        console.error('Error saving data:', error.message, error.stack);
        res.status(500).json({ message: 'Error saving data', error: error.message });
    }
});

module.exports = router;
