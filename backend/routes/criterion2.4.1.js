
const express = require('express');
const Criterion241 = require('../models/Criterion2.4.1');
const router = express.Router();

router.post('/', async (req, res) => {
    try {
        console.log(req.body);
        const {
            'Name of the Full time teacher': name,
            'Highest Qualification': highestQualification,
            'Designation': designation,
            'Date of Joining': dateOfJoining
        } = req.body;

        const newCriterion241 = new Criterion241({
            name,
            highestQualification,
            designation,
            dateOfJoining: new Date(dateOfJoining)
        });

        await newCriterion241.save();
        res.status(201).json({ message: 'Data saved successfully' });
    } catch (error) {
        console.error('Error saving data:', error);
        res.status(500).json({ message: 'Error saving data', error });
    }

    router.get('/', async (req, res) => {
        try {
            const data = await Criterion241.find({});
            res.status(200).json(data);
            console.log(data)
        } catch (error) {
            console.error('Error fetching data:', error);
            res.status(500).json({ message: 'Error fetching data', error });
        }
    });
});

module.exports = router;
