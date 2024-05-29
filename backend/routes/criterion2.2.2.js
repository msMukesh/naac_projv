const express = require('express');
const Criterion222 = require('../models/Criterion2.2.2');
const router = express.Router();

router.post('/', async (req, res) => {
    try {
        console.log(req.body);
        const {
            'Academic Year': academicYear,
            'Total Number admitted Students in all programs': totalNumberAdmittedStudentsInAllPrograms,
            'Total Number of Teachers': totalNumberOfTeachers,
            'Full time Ratio': fullTimeRatio
        } = req.body;

        const newCriterion222 = new Criterion222({
            academicYear,
            totalNumberAdmittedStudentsInAllPrograms,
            totalNumberOfTeachers,
            fullTimeRatio
        });

        await newCriterion222.save();
        res.status(201).json({ message: 'Data saved successfully' });
    } catch (error) {
        console.error('Error saving data:', error);
        res.status(500).json({ message: 'Error saving data', error });
    }
});


router.get('/', async (req, res) => {
    try {
        const data = await Criterion222.find({});
        res.status(200).json(data);
        console.log(data)
    } catch (error) {
        console.error('Error fetching data:', error);
        res.status(500).json({ message: 'Error fetching data', error });
    }
});

module.exports = router;
