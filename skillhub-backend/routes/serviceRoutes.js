const express = require('express');
const router = express.Router();
const auth = require('../middleware/authMiddleware');
const {createService, getAllServices, updateService, deleteService} = require('../controllers/serviceController');

// POST /api/services
router.post('/services', auth, createService);

// GET /api/services
router.get ('/services', getAllServices);

// PUT /api/services/:id
router.put ('/services/:id', auth, updateService);

// DELETE /api/services/:id
router.delete('/services/:id', auth, deleteService);

module.exports = router;