const mongoose = require('mongoose');

const criterion222Schema = new mongoose.Schema({
  academicYear: {
    type: String,
    required: true
  },
  totalNumberAdmittedStudentsInAllPrograms: {
    type: String,
    required: true
  },
  totalNumberOfTeachers: {
    type: String,
    required: true
  },
  fullTimeRatio: {
    type: String,
    required: true
  }
});

const Criterion222 = mongoose.model('Criterion2.2.2', criterion222Schema);

module.exports = Criterion222;
