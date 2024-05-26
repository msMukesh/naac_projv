const mongoose = require('mongoose');

const criterion251Schema = new mongoose.Schema({
  semesterWise: {
    type: String,
    required: true
  },
  lastDateOfLastSemesterEndExamination: {
    type: String,
    required: true
  },
  dateOfDeclarationOfResultsOfSemesterEndExamination: {
    type: String,
    required: true
  },
  numberOfDaysTakenForDeclarationOfResults: {
    type: String,
    required: true
  },
  averageNumberOfDaysForDeclarationOfResultsDuringTheYear: {
    type: String,
    required: true
  }
});

const Criterion251 = mongoose.model('Criterion2.5.1', criterion251Schema);

module.exports = Criterion251;
