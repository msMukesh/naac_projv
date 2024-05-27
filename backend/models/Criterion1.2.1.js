const mongoose = require('mongoose');

const criterion121Schema = new mongoose.Schema({
    namesOfNewCourses: {
        type: String,
        required: true
    },
    nameOfProgram: {
        type: String,
        required: true
    },
    dataTemplate: {
        type: String,
        required: true
    },
    supportingDocuments: {
        type: String,
        required: true
    }
});

const Criterion121 = mongoose.model('Criterion1.2.1', criterion121Schema);

module.exports = Criterion121;
