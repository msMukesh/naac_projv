const express = require('express');
const Criterion112 = require('../models/Criterion1.1.2');
const router = express.Router();

router.post('/', async (req, res) => {
    try {
        console.log('Received data:', req.body);
        const {
            'Academic Year': academicYear,
            'Programme Code': programmeCode,
            'Names of Programs Revised': namesOfProgramsRevised,
            'Copy of the Data Template': copyOfDataTemplate,
            'Relevant Supporting Documents': relevantSupportingDocuments,
            'Link for Additional Information': linkForAdditionalInformation
        } = req.body;

        const newCriterion112 = new Criterion112({
            academicYear,
            programmeCode,
            namesOfProgramsRevised,
            copyOfDataTemplate,
            relevantSupportingDocuments,
            linkForAdditionalInformation
        });

        console.log('Saving data:', newCriterion112);
        await newCriterion112.save();
        res.status(201).json({ message: 'Data saved successfully' });
    } catch (error) {
        console.error('Error saving data:', error.message, error.stack);
        res.status(500).json({ message: 'Error saving data', error: error.message });
    }
});

module.exports = router;
