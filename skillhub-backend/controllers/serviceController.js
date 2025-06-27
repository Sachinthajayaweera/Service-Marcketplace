const Service = require ('../models/service');
const User = require('../models/user');

//CREATE service
exports.createService = async (req, res)=>{
    try{
        if(req.user.role !== 'seller'){
            return res.status(403).json({message:"Only sellers can create services"});
        }

        const{title, description, price, category} = req.body;

        const newService = await Service.create({
            title,
            description,
            price,
            category,
            userId:req.user.id
        });

        res.status(201).json({message: "Service created", Service: newService});  
    }catch(error){
        res.status(500).json({error:error.message});
    }
};


//VIEW service
exports.getAllServices = async (req, res) => {
  const { search, category } = req.query;
  const { Op } = require('sequelize');

  try {
    const where = {};

    if (search) {
      where[Op.or] = [
        { title: { [Op.like]: `%${search}%` } },
        { description: { [Op.like]: `%${search}%` } }
      ];
    }

    if (category) {
      where.category = category;
    }

    const services = await Service.findAll({
      where,
      include: {
        model: User,
        attributes: ['id', 'name']
      }
    });

    res.json(services);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

//UPDATE service
exports.updateService = async (req, res)=>{
    try{
        const service = await Service.findByPk(req.params.id);

        if(!service)return res.status(404).json({message:"Service not found"});
        if(service.userId !== req.user.id){
            return res.status(403).json({message:"Unauthorized"});
        }

        const{title, description, price, category } = req.body;
        await service.update({title, description, price,category});

        res.json({message:"Service updated", service});
    } catch(err){
        res.status(500).json({error:err.message});
    }
};

//DELETE service
exports.deleteService = async (req, res)=>{
    const serviceId = req.params.id;


    try{
        const service = await Service.findByPk(serviceId);
        
        if(!service) return res.status(404).json({message:"Service not found"});
        if(!service.userId !== req.user.id){
            return res.status(403).json({message:"Unauthorized"});
        }

        await service.distroy();
        res.json({message:"Service deleted"});
       }catch(err){
        res.status(500).json({error:err.message});
       }
};

//View My Services

exports.getMyServices = async(req, res) =>{
    try{
        const userId = req.user.id;
        const services = await Service.findAll({where:{userId: req.user.id}});
        res.status(200).json(services);
    }catch(error){
        console.error(error);
        res.status(500).json({error: 'Server error'});
    }
};

//view Services for ID

exports.getServiceById = async (req, res) => {
  try {
    const service = await Service.findByPk(req.params.id);
    if (!service) return res.status(404).json({ message: 'Not found' });

    // Optional: ensure user owns the service
    if (service.userId !== req.user.id) {
      return res.status(403).json({ message: 'Unauthorized' });
    }

    res.json(service);
  } catch (err) {
    res.status(500).json({ error: 'Server error' });
  }
};


