const mongoose = require('mongoose');

const criterion254Schema = new mongoose.Schema({
    examCommitteeNames: {
        type: String,
        required: true
    },
    courseCode: {
        type: String,
        required: true
    },
    evaluationMarksGalleySheet: {
        type: String,
        required: true
    },
    attendanceSheetOfExam: {
        type: String,
        required: true
    },
    questionPaperAttachment: {
        type: String,
        required: true
    },
    syllabusCoverageWithQuestionPaper: {
        type: String,
        required: true
    },
    otherRelatedDocument: {
        type: String,
        required: true
    }
});

const Criterion254 = mongoose.model('Criterion2.5.4', criterion254Schema);

module.exports = Criterion254;
