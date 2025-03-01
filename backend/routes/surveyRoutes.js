// const express = require('express');
// const router = express.Router();
// const surveyController = require('../controllers/surveyController');
// const authMiddleware = require('../middleware/authMiddleware');

// router.get('/questions', surveyController.getQuestions);
// router.post('/submit', surveyController.submitSurvey);
// router.get('/data', authMiddleware, surveyController.getSurveyData);

// module.exports = router;

const express = require('express');
const router = express.Router();
const surveyController = require('../controllers/surveyController');
const authMiddleware = require('../middleware/authMiddleware');

router.get('/questions', surveyController.getQuestions);
router.post('/submit', surveyController.submitSurvey);
router.get('/data', authMiddleware, surveyController.getSurveyData);

module.exports = router;