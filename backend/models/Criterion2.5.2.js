const mongoose = require('mongoose');

const criterion252Schema = new mongoose.Schema({
  academicYear: {
    type: String,
    required: true
  },
  totalNumberOfStudentsAppearedInExaminations: {
    type: String,
    required: true
  },
  numberOfComplaintsGrievancesAboutEvaluation: {
    type: String,
    required: true
  },
  anyOtherInformation: {
    type: String,
    required: false
  }
});

const Criterion252 = mongoose.model('Criterion2.5.2', criterion252Schema);

module.exports = Criterion252;
