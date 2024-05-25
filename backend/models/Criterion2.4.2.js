// models/Criterion2.4.2.js
const mongoose = require('mongoose');

const criterionSchema242 = new mongoose.Schema({
  academicYear: {
    type: String,
    required: true
  },
  name: {
    type: String,
    required: true
  },
  maximumQualification: {
    type: String,
    required: true
  },
  additionalInformation: {
    type: String,
    
  }
});

const Criterion242 = mongoose.model('Criterion2.4.2', criterionSchema242);

module.exports = Criterion242;
