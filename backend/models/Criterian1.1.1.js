const mongoose = require('mongoose');

const CriterianSchema = new mongoose.Schema({
    longText: {
        type: String,
        required: true
    }
});

const Criterian = mongoose.model('Criterian1.1.1', CriterianSchema);

module.exports = Criterian;
