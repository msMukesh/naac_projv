
const mongoose = require('mongoose');

const criterionSchema241 = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  highestQualification: {
    type: String,
    required: true
  },
  designation: {
    type: String,
    required: true
  },
  dateOfJoining: {
    type: String,
    required: true
  }
});

const criterion241 = mongoose.model('Criterion2.4.1', criterionSchema241);

module.exports = criterion241;
