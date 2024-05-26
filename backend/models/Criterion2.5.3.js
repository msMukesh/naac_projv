const mongoose = require('mongoose');

const criterion253Schema = new mongoose.Schema({
    academicYear: {
        type: String,
        required: true
    },
    semesterNumber: {
        type: String,
        required: true
    },
    courseCodeAndName: {
        type: String,
        required: true
    },
    teacherName: {
        type: String,
        required: true
    },
    onlineTeachingPercentage: {
        type: String,
        required: true
    },
    LMSName: {
        type: String,
        required: true
    },
    ICTMethods: {
        type: String,
        required: true
    },
    examLMSMethod: {
        type: String,
        required: true
    }
});

const Criterion253 = mongoose.model('Criterion2.5.3', criterion253Schema);

module.exports = Criterion253;
