const mongoose = require('mongoose');

const criterion122Schema = new mongoose.Schema({
    programsAdoptingCBCS: {
        type: String,
        required: true
    },
    programsAdoptingECS: {
        type: String,
        required: true
    },
    dataTemplate: {
        type: String,
        required: true
    },
    supportingDocuments: {
        type: String,
        required: true
    }
});

const Criterion122 = mongoose.model('Criterion1.2.2', criterion122Schema);

module.exports = Criterion122;
