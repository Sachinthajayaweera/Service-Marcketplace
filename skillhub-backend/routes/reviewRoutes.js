const express = require('express');
const router = express.Router();
const auth = require('../middleware/authMiddleware');
const { addReview, getReviewsForService } = require('../controllers/reviewController');

// POST /api/reviews 
router.post('/reviews', auth, addReview);

// GET /api/services/:id/reviews 
router.get('/services/:id/reviews', getReviewsForService);

module.exports = router;
