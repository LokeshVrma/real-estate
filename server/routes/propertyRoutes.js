const express = require('express');
const {
    getAllProperties,
    getRecommendedProperties,
    handleUserInteraction,
} = require('../controllers/propertyController');

const router = express.Router();

router.get('/', getAllProperties);
router.post('/recommendations', getRecommendedProperties);
router.post('/interaction', handleUserInteraction);

module.exports = router;
