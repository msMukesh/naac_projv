const mongoose = require('mongoose');

const criterion211Schema = new mongoose.Schema({
    academicYear: { type: String, required: true },
    nameOfProgram: { type: String, required: true },
    numberOfSeatsAvailable: { type: String, required: true },
    numberOfEligibleApplicationsReceived: { type: String, required: true },
    numberOfSeatsFilled: { type: String, required: true }
});

module.exports = mongoose.model('Criterion2.1.1', criterion211Schema);
