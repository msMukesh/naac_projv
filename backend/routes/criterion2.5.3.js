const express = require('express');
const Criterion253 = require('../models/Criterion2.5.3');
const router = express.Router();

router.post('/', async (req, res) => {
    try {
        console.log('Received data:', req.body);
        const {
            'Academic Year': academicYear,
            'Sem. No': semesterNumber,
            'Course Code & Name': courseCodeAndName,
            'Name of the Teacher': teacherName,
            '% of online Teaching': onlineTeachingPercentage,
            'Name of the LMS for online Teaching': LMSName,
            'Methods of ICT for Teaching': ICTMethods,
            'Method of LMS for Exam': examLMSMethod
        } = req.body;

        const newCriterion253 = new Criterion253({
            academicYear,
            semesterNumber,
            courseCodeAndName,
            teacherName,
            onlineTeachingPercentage,
            LMSName,
            ICTMethods,
            examLMSMethod
        });

        console.log('Saving data:', newCriterion253);
        await newCriterion253.save();
        res.status(201).json({ message: 'Data saved successfully' });
    } catch (error) {
        console.error('Error saving data:', error.message, error.stack);
        res.status(500).json({ message: 'Error saving data', error: error.message });
    }
});

module.exports = router;
