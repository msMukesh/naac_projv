const mongoose = require('mongoose');

const criterion112Schema = new mongoose.Schema({
    academicYear: {
        type: String,
        required: true
    },
    programmeCode: {
        type: String,
        required: true
    },
    namesOfProgramsRevised: {
        type: String,
        required: true
    },
    copyOfDataTemplate: {
        type: String,
        required: true
    },
    relevantSupportingDocuments: {
        type: String,
        required: true
    },
    linkForAdditionalInformation: {
        type: String,
        required: false
    }
});

const Criterion112 = mongoose.model('Criterion1.1.2', criterion112Schema);

module.exports = Criterion112;
