const express = require('express');
const Criterion252 = require('../models/Criterion2.5.2');
const router = express.Router();

router.post('/', async (req, res) => {
    try {
        console.log('Received data:', req.body);
        const {
            'Academic Year': academicYear,
            'Total number of students appeared in the examinations': totalNumberOfStudentsAppearedInExaminations,
            'Number of complaints/grievances about evaluation': numberOfComplaintsGrievancesAboutEvaluation,
            'Any other information': anyOtherInformation
        } = req.body;

        const newCriterion252 = new Criterion252({
            academicYear,
            totalNumberOfStudentsAppearedInExaminations,
            numberOfComplaintsGrievancesAboutEvaluation,
            anyOtherInformation
        });

        console.log('Saving data:', newCriterion252);
        await newCriterion252.save();
        res.status(201).json({ message: 'Data saved successfully' });
    } catch (error) {
        console.error('Error saving data:', error.message, error.stack);
        res.status(500).json({ message: 'Error saving data', error: error.message });
    }

    router.get('/', async (req, res) => {
        try {
            const data = await Criterion252.find({});
            res.status(200).json(data);
            console.log(data)
        } catch (error) {
            console.error('Error fetching data:', error);
            res.status(500).json({ message: 'Error fetching data', error });
        }
    });
});

module.exports = router;
