const express = require('express');
const Criterion133 = require('../models/Criterion1.3.3');
const router = express.Router();

router.post('/', async (req, res) => {
    try {
        console.log('Received data:', req.body);
        const {
            'Academic Year': academicYear,
            'Total number of students admitted': totalStudentsAdmitted,
            'Number of students completed the course': studentsCompletedCourse
        } = req.body;

        const newCriterion133 = new Criterion133({
            academicYear,
            totalStudentsAdmitted,
            studentsCompletedCourse
        });

        console.log('Saving data:', newCriterion133);
        await newCriterion133.save();
        res.status(201).json({ message: 'Data saved successfully' });
    } catch (error) {
        console.error('Error saving data:', error.message, error.stack);
        res.status(500).json({ message: 'Error saving data', error: error.message });
    }
});

module.exports = router;
