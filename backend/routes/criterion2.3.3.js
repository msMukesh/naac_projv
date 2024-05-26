// routes/mentorStats.js
const express = require('express');
const Criterion233 = require('../models/Criterion2.3.3');
const router = express.Router();

router.post('/', async (req, res) => {
    try {
        console.log(req.body);
        const {
            'Academic Year': academicYear,
            'Number of Mentors': numberOfMentors,
            'Number of Students per mentor': numberOfStudentsPerMentor
        } = req.body;

        const newMentorStats = new Criterion233({
            academicYear,
            numberOfMentors,
            numberOfStudentsPerMentor
        });

        await newMentorStats.save();
        res.status(201).json({ message: 'Data saved successfully' });
    } catch (error) {
        console.error('Error saving data:', error);
        res.status(500).json({ message: 'Error saving data', error });
    }
});

module.exports = router;