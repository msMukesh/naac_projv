const express = require('express');
const Criterion132 = require('../models/Criterion1.3.2');
const router = express.Router();

router.post('/', async (req, res) => {
    try {
        console.log('Received data:', req.body);
        const {
            'Academic Year': academicYear,
            'Name(s) of the New Value added course with 30 or more contact hours': newValueAddedCourse,
            'Number of times the course is offered in the same year': courseOfferedCount
        } = req.body;

        const newCriterion132 = new Criterion132({
            academicYear,
            newValueAddedCourse,
            courseOfferedCount
        });

        console.log('Saving data:', newCriterion132);
        await newCriterion132.save();
        res.status(201).json({ message: 'Data saved successfully' });
    } catch (error) {
        console.error('Error saving data:', error.message, error.stack);
        res.status(500).json({ message: 'Error saving data', error: error.message });
    }

    router.get('/', async (req, res) => {
        try {
            const criterion132Data = await Criterion132.find();
            res.status(200).json(criterion132Data);
        } catch (error) {
            console.error('Error fetching data:', error.message, error.stack);
            res.status(500).json({ message: 'Error fetching data', error: error.message });
        }
    });
});

module.exports = router;
