const mongoose = require('mongoose');

const criterion244Schema = new mongoose.Schema({
  yearOfAward: {
    type: String,
    required: true
  },
  nameOfFullTimeTeacher: {
    type: String,
    required: true
  },
  designation: {
    type: String,
   
  },
  level: {
    type: String, // International/National/State
  
  },
  nameOfAward: {
    type: String,
    required: true
  },
  sponsoringAgency: {
    type: String,
    required: true
  }
});

const Criterion244 = mongoose.model('Criterion2.4.4', criterion244Schema);

module.exports = Criterion244;
