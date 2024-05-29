const mongoose = require('mongoose');

const CriterianSchema = new mongoose.Schema({
    longText: {
        type: String,
        required: true
    }
});

const Criterian = mongoose.model('Criterian131', CriterianSchema);

module.exports = Criterian;
