const express = require('express');
const Criterion263 = require('../models/Criterion2.6.3');
const router = express.Router();

router.post('/', async (req, res) => {
    try {
        console.log('Received data:', req.body);
        const {
            'Academic Year': academicYear,
            'Programme Code': programmeCode,
            'Name of the Programme': programmeName,
            'Number of Students Appeared': studentsAppeared,
            'Number of Students Passed': studentsPassed,
            'Pass (%)': passPercentage
        } = req.body;

        const newCriterion263 = new Criterion263({
            academicYear,
            programmeCode,
            programmeName,
            studentsAppeared: Number(studentsAppeared), // Converting to number
            studentsPassed: Number(studentsPassed), // Converting to number
            passPercentage: Number(passPercentage) // Converting to number
        });

        console.log('Saving data:', newCriterion263);
        await newCriterion263.save();
        res.status(201).json({ message: 'Data saved successfully' });
    } catch (error) {
        console.error('Error saving data:', error.message, error.stack);
        res.status(500).json({ message: 'Error saving data', error: error.message });
    }

    router.get('/', async (req, res) => {
        try {
            const data = await Criterion263.find({});
            res.status(200).json(data);
            console.log(data)
        } catch (error) {
            console.error('Error fetching data:', error);
            res.status(500).json({ message: 'Error fetching data', error });
        }
    });
});

module.exports = router;
