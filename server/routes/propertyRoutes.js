const express = require('express');
const {
    getAllProperties,
    getRecommendedProperties,
    handleUserInteraction,
    getPropertyById
} = require('../controllers/propertyController');

const router = express.Router();

router.get('/', getAllProperties);
router.post('/recommendations', getRecommendedProperties);
router.post('/interaction', handleUserInteraction);
router.get('/properties/:propertyId', getPropertyById);

module.exports = router;
