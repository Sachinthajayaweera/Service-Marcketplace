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
exports.getAllServices = async (req, res)=>{
    try{
        const services = await Service.findAll({
            include:{
                model: User,
                attributes: ['id', 'name']
            }
        });
        res.json(services);
    }catch (error){
        res.status(500).json({error:error.message});
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
    try{
        const service = await Service.findByPk(req.params.id);
        
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