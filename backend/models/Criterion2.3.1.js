const mongoose = require('mongoose');

const CriterianSchema231 = new mongoose.Schema({
    longText: {
        type: String,
        required: true
    }
});

const Criterian231 = mongoose.model('Criterian2.3.1', CriterianSchema231);

module.exports = Criterian231;
