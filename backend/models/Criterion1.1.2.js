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
    copyOfTheDataTemplate: {
        type: String,
        required: true
    },
    relevantSupportingDocuments: {
        type: String,
        required: true
    },
    linkForAdditionalInformation: {
        type: String,
        required: true
    }
});

// Check if the model already exists before defining it
const Criterion112 = mongoose.models.Criterion112 || mongoose.model('Criterion112', criterion112Schema);

module.exports = Criterion112;
