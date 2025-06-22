const express = require('express');
const router = express.Router();
const auth = require('../middleware/authMiddleware');
const { getSellerDashboard } = require('../controllers/dashboardController');

// GET /api/dashboard/seller
router.get('/dashboard/seller', auth, getSellerDashboard);

module.exports = router;
