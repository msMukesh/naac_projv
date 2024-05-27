const mongoose = require('mongoose');

const criterion134Schema = new mongoose.Schema({
    academicYear: {
        type: String,
        required: true
    },
    programName: {
        type: String,
        required: true
    },
    fieldProjects: {
        type: String,
        required: true
    },
    researchProjects: {
        type: String,
        required: true
    }
});

const Criterion134 = mongoose.model('Criterion1.3.4', criterion134Schema);

module.exports = Criterion134;
