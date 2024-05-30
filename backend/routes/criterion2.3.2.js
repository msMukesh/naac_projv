// routes/ictUsage.js
const express = require('express');
const criterion232 = require('../models/Criterion2.3.2');
const router = express.Router();

router.post('/', async (req, res) => {
    try {
        console.log(req.body);
        const {
            'Number of teachers on roll': numberOfTeachersOnRoll,
            'Number of teachers using ICT (LMS, eResources)': numberOfTeachersUsingICT,
            'ICT tools and resources available': ictToolsAndResourcesAvailable,
            'Number of ICT enabled classrooms': numberOfICTEnabledClassrooms,
            'E-Resources and techniques used': eResourcesAndTechniquesUsed
        } = req.body;

        const newICTUsage = new criterion232({
            numberOfTeachersOnRoll,
            numberOfTeachersUsingICT,
            ictToolsAndResourcesAvailable,
            numberOfICTEnabledClassrooms,
            eResourcesAndTechniquesUsed
        });

        await newICTUsage.save();
        res.status(201).json({ message: 'Data saved successfully' });
    } catch (error) {
        console.error('Error saving data:', error);
        res.status(500).json({ message: 'Error saving data', error });
    }

    router.get('/', async (req, res) => {
        try {
            const data = await criterion232.find({});
            res.status(200).json(data);
            console.log(data)
        } catch (error) {
            console.error('Error fetching data:', error);
            res.status(500).json({ message: 'Error fetching data', error });
        }
    });
});

module.exports = router;
