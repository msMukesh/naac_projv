// models/MentorStats.js
const mongoose = require('mongoose');

const criterionSchema233 = new mongoose.Schema({
  academicYear: {
    type: String,
    required: true
  },
  numberOfMentors: {
    type: String,
    required: true
  },
  numberOfStudentsPerMentor: {
    type: String,
    required: true
  }
});

const Criterion233 = mongoose.model('Criterion2.3.3', criterionSchema233);

module.exports = Criterion233;
