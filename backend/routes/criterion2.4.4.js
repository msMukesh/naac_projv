const express = require('express');
const Criterion244 = require('../models/Criterion2.4.4');
const router = express.Router();

router.post('/', async (req, res) => {
    try {
        console.log(req.body);
        const {
            'Year of Award': yearOfAward,
            'Name of Full time Teacher': nameOfFullTimeTeacher,
            'Designation': designation,
            'International/National/State': level,
            'Name of the Award': nameOfAward,
            'Sponsoring Agency': sponsoringAgency
        } = req.body;

        const newCriterion244 = new Criterion244({
            yearOfAward,
            nameOfFullTimeTeacher,
            designation,
            level,
            nameOfAward,
            sponsoringAgency
        });

        await newCriterion244.save();
        res.status(201).json({ message: 'Data saved successfully' });
    } catch (error) {
        console.error('Error saving data:', error);
        res.status(500).json({ message: 'Error saving data', error });
    }

    router.get('/', async (req, res) => {
        try {
            const data = await Criterion244.find({});
            res.status(200).json(data);
            console.log(data)
        } catch (error) {
            console.error('Error fetching data:', error);
            res.status(500).json({ message: 'Error fetching data', error });
        }
    });
});

module.exports = router;
