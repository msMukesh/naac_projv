const mongoose = require('mongoose');

const criterion132Schema = new mongoose.Schema({
    academicYear: {
        type: String,
        required: true
    },
    newValueAddedCourse: {
        type: String,
        required: true
    },
    courseOfferedCount: {
        type: String,
        required: true
    }
});

const Criterion132 = mongoose.model('Criterion1.3.2', criterion132Schema);

module.exports = Criterion132;
