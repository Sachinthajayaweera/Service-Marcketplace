const Review = require('../models/review');
const Order = require('../models/order');
const Service = require('../models/service');

// Add review
exports.addReview = async (req, res) => {
  try {
    const { orderId, rating, comment } = req.body;

    const order = await Order.findByPk(orderId, {
      include: Service
    });

    if (!order || order.userId !== req.user.id) {
      return res.status(403).json({ message: 'Unauthorized to review this order' });
    }

    if (order.status !== 'completed') {
      return res.status(400).json({ message: 'You can only review completed orders' });
    }

    const existingReview = await Review.findOne({ where: { orderId } });
    if (existingReview) {
      return res.status(400).json({ message: 'You have already reviewed this order' });
    }

    const review = await Review.create({
      rating,
      comment,
      userId: req.user.id,
      serviceId: order.serviceId,
      orderId
    });

    res.status(201).json({ message: 'Review added', review });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Get all reviews for a service
exports.getReviewsForService = async (req, res) => {
  try {
    const serviceId = req.params.id;
    const reviews = await Review.findAll({
      where: { serviceId },
      include: { model: User, attributes: ['name'] }
    });

    res.json(reviews);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};