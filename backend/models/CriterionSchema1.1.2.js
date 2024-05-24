const mongoose = require('mongoose');

const CriterionSchema = new mongoose.Schema({
    academicYear: {
        type: String,
        required: true,
      },
      programCode: {
        type: String,
        required: true,
      },
      namesOfProgramsRevised: {
        type: String,
        required: true,
      },
      copyOfTheDataTemplate: {
        type: String,
        required: true,
      },
      relevantSupportingDocuments: {
        type: String,
        required: true,
      },
      linkForAdditionalInformation: {
        type: String,
        required: true,
      },
});

const Criterion = mongoose.model('Criterion1.1.2', CriterionSchema);

module.exports = Criterion;
