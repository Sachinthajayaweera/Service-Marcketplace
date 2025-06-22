const express = require('express');
const router = express.Router();
const auth = require('../middleware/authMiddleware');
const {
    createOrder,
    getOrders,
    getAllOders,
    getMyOrders
} = require ('../controllers/orderController');

// POST /api/orders
router.post('/orders', auth, createOrder);

// GET /api/orders
router.get('/orders', auth, getMyOrders);

// GET /api/admin/orders
router.get('/admin/orders', auth, getAllOders);

module.exports = router;