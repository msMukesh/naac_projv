const mongoose = require('mongoose');

const criterion113Schema = new mongoose.Schema({
    academicYear: {
        type: String,
        required: true
    },
    programmeCode: {
        type: String,
        required: true
    },
    courseNames: {
        type: String,
        required: true
    },
    activities: {
        type: String,
        required: true
    },
    programName: {
        type: String,
        required: true
    },
    dataTemplate: {
        type: String,
        required: true
    }
});

const Criterion113 = mongoose.model('Criterion1.1.3', criterion113Schema);

module.exports = Criterion113;
