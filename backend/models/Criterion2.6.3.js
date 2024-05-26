const mongoose = require('mongoose');

const criterion263Schema = new mongoose.Schema({
    academicYear: {
        type: String,
        required: true
    },
    programmeCode: {
        type: String,
        required: true
    },
    programmeName: {
        type: String,
        required: true
    },
    studentsAppeared: {
        type: String, 
        required: true
    },
    studentsPassed: {
        type: String, 
        required: true
    },
    passPercentage: {
        type: String, 
        required: true
    }
});

const Criterion263 = mongoose.model('Criterion2.6.3', criterion263Schema);

module.exports = Criterion263;
