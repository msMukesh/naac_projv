const mongoose = require('mongoose');

const CriterianSchema = new mongoose.Schema({
    longText: {
        type: String,
        required: true
    }
});

const Criterian = mongoose.model('Criterian2.5.3Text', CriterianSchema);

module.exports = Criterian;
