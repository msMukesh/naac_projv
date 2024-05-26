const express = require('express');
const Criterion262 = require('../models/Criterion2.6.2');
const router = express.Router();

router.post('/', async (req, res) => {
    try {
        console.log('Received data:', req.body);
        const {
            'Names of the Teacher': teacherNames,
            'Course code (PG/Ph.D.)': courseCode,
            'No. of students registered': studentsRegistered,
            'No of students attended exam': studentsAttendedExam,
            'No. of students pass in exam': studentsPassedExam,
            '% of Failure students': failurePercentage,
            'Other related': otherRelated
        } = req.body;

        const newCriterion262 = new Criterion262({
            teacherNames,
            courseCode,
            studentsRegistered,
            studentsAttendedExam,
            studentsPassedExam,
            failurePercentage,
            otherRelated
        });

        console.log('Saving data:', newCriterion262);
        await newCriterion262.save();
        res.status(201).json({ message: 'Data saved successfully' });
    } catch (error) {
        console.error('Error saving data:', error.message, error.stack);
        res.status(500).json({ message: 'Error saving data', error: error.message });
    }
});

module.exports = router;
