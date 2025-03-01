const mongoose = require('mongoose');

const SurveyResponseSchema = new mongoose.Schema({
    shop: String,
    responses: Object,
    timestamp: { type: Date, default: Date.now },
});

module.exports = mongoose.model('SurveyResponse', SurveyResponseSchema);