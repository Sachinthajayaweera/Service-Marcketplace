const express = require('express');
const router = express.Router();
const auth = require('../middleware/authMiddleware');
const {createService, getAllServices, updateService, deleteService, getMyServices, getServiceById} = require('../controllers/serviceController');

// POST 
router.post('/', auth, createService);

// GET 
router.get ('/', getAllServices);

//GET /api/services/my
router.get('/my', auth, getMyServices);

//GET by ID
router.get('/:id', auth, getServiceById);

// PUT 
router.put ('/:id', auth, updateService);

// DELETE 
router.delete('/:id', auth, deleteService);

console.log("✅ Service routes loaded");


module.exports = router;