const { where } = require('sequelize');
const Order = require('../models/order');
const Service = require('../models/service');
const User = require('../models/user');

//Create a new order
exports.createOrder = async (req, res)=> {
    try{
        const {serviceId} = req.body;
        const service = await Service.findByPk(serviceId);

        if(!service) return res.status(404).json({message:"Service not found"});

        const order = await order.create({
            userId:req.user.id,
            serviceId:service.id
        });

        res.status(201).json({message:"Service booked",order});
    }catch(err){
        res.status(500).json({error:err.message});
    }
};

//Get LoggedIn user's oders
exports.getMyOrders = async (req, res)=>{
    try{
        const orders = await order.findAll({
            where:{userId:req.user.id},
            include:{model: Service}
        });

        res.json(orders);
    }catch(err){
        res.status(500).json({error:err.message});
    }
};

//Admin get all oders
exports.getAllOders = async (req, res)=> {
    try{
        if(req.user.role !== 'admin'){
            return res.status(403).json({message:"Only admins can view all oders"});
        }

        const orders = await Order.findAll({include:[Service, User]});
        res.json(orders);
    }catch(err){
        res.status(500).json({error:err.message});
    }
};

// Update order status
exports.updateOrderStatus = async (req, res) => {
  try {
    const order = await Order.findByPk(req.params.id, {
      include: { model: Service }
    });

    if (!order) return res.status(404).json({ message: "Order not found" });

    const requester = req.user;
    const serviceOwnerId = order.Service.userId;

    // Only seller (who owns the service) or admin can update
    if (requester.id !== serviceOwnerId && requester.role !== 'admin') {
      return res.status(403).json({ message: "Unauthorized" });
    }

    const { status } = req.body;
    const allowedStatuses = ['pending', 'accepted', 'rejected', 'completed'];

    if (!allowedStatuses.includes(status)) {
      return res.status(400).json({ message: "Invalid status value" });
    }

    order.status = status;
    await order.save();

    res.json({ message: "Order status updated", order });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};