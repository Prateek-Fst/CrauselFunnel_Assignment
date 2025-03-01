const SurveyResponse = require('../models/SurveyResponse');

exports.getQuestions = (req, res) => {
    const questions = [
        { id: 1, text: 'How satisfied are you with our service?', type: 'rating', options: [1, 2, 3, 4, 5] },
        { id: 2, text: 'Would you recommend us?', type: 'yesno', options: ['Yes', 'No'] },
    ];
    res.json(questions);
};

exports.submitSurvey = async (req, res) => {
    const { shop, responses } = req.body;
    if (!shop || !responses) {
        return res.status(400).json({ error: 'Missing shop or responses' });
    }
    try {
        const surveyResponse = new SurveyResponse({ shop, responses });
        await surveyResponse.save();
        res.status(200).json({ message: 'Survey submitted successfully' });
    } catch (err) {
        res.status(500).json({ error: 'Error saving response' });
    }
};

exports.getSurveyData = async (req, res) => {
  const shop = req.shop;
  console.log('Fetching data for shop:', shop); // Debug
  try {
    const responses = await SurveyResponse.find({ shop });
    console.log('Survey data:', responses); // Debug
    res.json(responses);
  } catch (err) {
    console.error('Error fetching data:', err);
    res.status(500).json({ error: 'Error fetching data' });
  }
};