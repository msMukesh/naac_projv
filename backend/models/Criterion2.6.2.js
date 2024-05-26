const mongoose = require('mongoose');

const criterion262Schema = new mongoose.Schema({
    teacherNames: {
        type: String,
        required: true
    },
    courseCode: {
        type: String,
        required: true
    },
    studentsRegistered: {
        type: String,
        required: true
    },
    studentsAttendedExam: {
        type: String,
        required: true
    },
    studentsPassedExam: {
        type: String,
        required: false  // Make studentsPassedExam not required
    },
    failurePercentage: {
        type: String,
        required: true
    },
    otherRelated: {
        type: String,
        required: false
    }
});

const Criterion262 = mongoose.model('Criterion2.6.2', criterion262Schema);

module.exports = Criterion262;
