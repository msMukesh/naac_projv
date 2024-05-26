const express = require('express');
const Criterion254 = require('../models/Criterion2.5.4');
const router = express.Router();

router.post('/', async (req, res) => {
    try {
        console.log('Received data:', req.body);
        const {
            'Names of Exam committee': examCommitteeNames,
            'Course code': courseCode,
            'Evaluation Marks Galley Sheet (Enclosure)': evaluationMarksGalleySheet,
            'Attendance sheet of exam (Enclosure)': attendanceSheetOfExam,
            'Question Paper attachment': questionPaperAttachment,
            'scrutiny of syllabus coverage with Question Paper': syllabusCoverageWithQuestionPaper,
            'Other related document': otherRelatedDocument
        } = req.body;

        const newCriterion254 = new Criterion254({
            examCommitteeNames,
            courseCode,
            evaluationMarksGalleySheet,
            attendanceSheetOfExam,
            questionPaperAttachment,
            syllabusCoverageWithQuestionPaper,
            otherRelatedDocument
        });

        console.log('Saving data:', newCriterion254);
        await newCriterion254.save();
        res.status(201).json({ message: 'Data saved successfully' });
    } catch (error) {
        console.error('Error saving data:', error.message, error.stack);
        res.status(500).json({ message: 'Error saving data', error: error.message });
    }
});

module.exports = router;
