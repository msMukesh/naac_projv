const express = require('express');
const Criterion2521 = require('../models/criterionSchema2.5.2');
const router = express.Router();

router.post('/', async (req, res) => {
    try {
        console.log('Received data:', req.body);
        const {
            'Academic Year': academicYear,
            'Sem. No': semesterNumber,
            'Course Code and Name': courseCodeAndName,
            'Name of the Teacher': teacherName,
            'No of students having grievances on results': numberOfStudentsHavingGrievances,
            'No of students resolved the grievances ': numberOfStudentsResolvedGrievances,
            'Reasons for non-clearing grievances ': reasonsForNonClearingGrievances
        } = req.body;

        const newCriterion2521 = new Criterion2521({
            academicYear,
            semesterNumber,
            courseCodeAndName,
            teacherName,
            numberOfStudentsHavingGrievances,
            numberOfStudentsResolvedGrievances,
            reasonsForNonClearingGrievances
        });

        console.log('Saving data:', newCriterion2521);
        await newCriterion2521.save();
        res.status(201).json({ message: 'Data saved successfully' });
    } catch (error) {
        console.error('Error saving data:', error.message, error.stack);
        res.status(500).json({ message: 'Error saving data', error: error.message });
    }
});

module.exports = router;
