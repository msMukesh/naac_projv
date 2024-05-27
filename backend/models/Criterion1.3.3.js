const mongoose = require('mongoose');

const criterion133Schema = new mongoose.Schema({
    academicYear: {
        type: String,
        required: true
    },
    totalStudentsAdmitted: {
        type: String,
        required: true
    },
    studentsCompletedCourse: {
        type: String,
        required: true
    }
});

const Criterion133 = mongoose.model('Criterion1.3.3', criterion133Schema);

module.exports = Criterion133;
