// models/ICTUsage.js
const mongoose = require('mongoose');

const criterionSchema232 = new mongoose.Schema({
  numberOfTeachersOnRoll: {
    type: String,
    required: true
  },
  numberOfTeachersUsingICT: {
    type: String,
    required: true
  },
  ictToolsAndResourcesAvailable: {
    type: String,
    required: true
  },
  numberOfICTEnabledClassrooms: {
    type: String,
    required: true
  },
  eResourcesAndTechniquesUsed: {
    type: String,
    required: true
  }
});

const criterion232 = mongoose.model('Criterion2.3.2', criterionSchema232);

module.exports = criterion232;
