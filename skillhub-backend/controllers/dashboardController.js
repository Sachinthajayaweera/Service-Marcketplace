const Service = require('../models/service');
const Order = require('../models/order');
const { Op } = require('sequelize');

exports.getSellerDashboard = async (req, res) => {
  try {
    const sellerId = req.user.id;

    // Get total services by this seller
    const totalServices = await Service.count({
      where: { userId: sellerId }
    });

    // Get orders for seller's services
    const sellerOrders = await Order.findAll({
      include: {
        model: Service,
        where: { userId: sellerId }
      }
    });

    const totalOrders = sellerOrders.length;

    // Group orders by status
    const statusCount = {
      pending: 0,
      accepted: 0,
      completed: 0,
      rejected: 0
    };

    let totalRevenue = 0;

    sellerOrders.forEach(order => {
      const status = order.status;
      if (statusCount[status] !== undefined) {
        statusCount[status]++;
      }

      if (status === 'completed') {
        totalRevenue += order.Service.price;
      }
    });

    res.json({
      totalServices,
      totalOrders,
      statusCount,
      totalRevenue
    });

  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
