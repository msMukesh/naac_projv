const express = require('express');
const Criterion251 = require('../models/Criterion2.5.1');
const router = express.Router();

router.post('/', async (req, res) => {
    try {
        console.log('Received data:', req.body);
        const {
            'Semester-wise': semesterWise,
            'Last date of the last semester-end examination': lastDateOfLastSemesterEndExamination,
            'Date of declaration of results of semester-end examination': dateOfDeclarationOfResultsOfSemesterEndExamination,
            'Number of days taken for declaration of the results': numberOfDaysTakenForDeclarationOfResults,
            'Average number of days for declaration of results during the year': averageNumberOfDaysForDeclarationOfResultsDuringTheYear
        } = req.body;

        const newCriterion251 = new Criterion251({
            semesterWise,
            lastDateOfLastSemesterEndExamination,
            dateOfDeclarationOfResultsOfSemesterEndExamination,
            numberOfDaysTakenForDeclarationOfResults,
            averageNumberOfDaysForDeclarationOfResultsDuringTheYear
        });

        console.log('Saving data:', newCriterion251);
        await newCriterion251.save();
        res.status(201).json({ message: 'Data saved successfully' });
    } catch (error) {
        console.error('Error saving data:', error.message, error.stack);
        res.status(500).json({ message: 'Error saving data', error: error.message });
    }
});

module.exports = router;
