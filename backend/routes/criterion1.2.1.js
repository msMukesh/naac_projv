const express = require('express');
const Criterion121 = require('../models/Criterion1.2.1');
const router = express.Router();

router.post('/', async (req, res) => {
    try {
        console.log('Received data:', req.body);
        const {
            'Names of the New Courses Introduced': namesOfNewCourses,
            'Name of the Program': nameOfProgram,
            ' Copy of the Data Template': dataTemplate,
            'Relevant Supporting Documents': supportingDocuments
        } = req.body;

        const newCriterion121 = new Criterion121({
            namesOfNewCourses,
            nameOfProgram,
            dataTemplate,
            supportingDocuments
        });

        console.log('Saving data:', newCriterion121);
        await newCriterion121.save();
        res.status(201).json({ message: 'Data saved successfully' });
    } catch (error) {
        console.error('Error saving data:', error.message, error.stack);
        res.status(500).json({ message: 'Error saving data', error: error.message });
    }
});

module.exports = router;
