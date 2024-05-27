const express = require('express');
const router = express.Router();
const Criterion134 = require('../models/Criterion1.3.4');

// POST request to save data
router.post('/', async (req, res) => {
    try {
        const { academicYear, programName, fieldProjects, researchProjects } = req.body;

        // Ensure all required fields are present
        if (!academicYear || !programName || !fieldProjects || !researchProjects) {
            return res.status(400).json({ error: "All fields are required." });
        }

        const newRecord = new Criterion134({
            academicYear,
            programName,
            fieldProjects,
            researchProjects
        });

        await newRecord.save();
        console.log("Saving data:", newRecord);
        res.status(201).json(newRecord);
    } catch (error) {
        console.error("Error saving data:", error);
        res.status(500).json({ error: error.message });
    }
});

module.exports = router;
