const mongoose = require('mongoose');

const criterionSchema2521 = new mongoose.Schema({
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
  numberOfStudentsHavingGrievances: {
    type: String,
    required: true
  },
  numberOfStudentsResolvedGrievances: {
    type: String,
    required: true
  },
  reasonsForNonClearingGrievances: {
    type: String,
    required: false
  }
});

const Criterion2521 = mongoose.model('CriterionSchema2.5.2', criterionSchema2521);

module.exports = Criterion2521;
