const express = require('express');
const Criterion122 = require('../models/Criterion1.2.2');
const router = express.Router();

router.post('/', async (req, res) => {
    try {
        console.log('Received data:', req.body);
        const {
            'Names of the programs adopting CBCS': programsAdoptingCBCS,
            'Names of the programs adopting ECS': programsAdoptingECS,
            'Copy of the Data Template': dataTemplate,
            'Relevant Supporting Documents': supportingDocuments
        } = req.body;

        const newCriterion122 = new Criterion122({
            programsAdoptingCBCS,
            programsAdoptingECS,
            dataTemplate,
            supportingDocuments
        });

        console.log('Saving data:', newCriterion122);
        await newCriterion122.save();
        res.status(201).json({ message: 'Data saved successfully' });
    } catch (error) {
        console.error('Error saving data:', error.message, error.stack);
        res.status(500).json({ message: 'Error saving data', error: error.message });
    }
});

module.exports = router;
