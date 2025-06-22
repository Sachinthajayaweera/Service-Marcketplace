const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/user');
require('dotenv').config();

exports.register = async (req, res)=>{
    const{name, email, password, role}= req.body;
    try{
        const existing = await User.findOne({where: {email}});
        if(existing) return res.status(400).json({ message:"Emali already used"});

        const hashed = await bcrypt.hash(password, 10);
        const user = await User.create({name,email, password: hashed, role});
        res.status(201).json({message: "User registered", user});
    }catch (err){
        res.status(201).json({error: err.message});
    }
};

exports.login = async (req, res)=> {
    const{email,password}=req.body;
    try{
        const user = await User.findOne({where:{email}});
        if(!user) return res.status(400).json({message:"Invalid credentials"});

        const isMatch = await bcrypt.compare(password,user.password);
        if(!isMatch) return res.status(400).json({message:"Invalid credentials"});

        const token = jwt.sign ({id:user.id,role:user.role}, process.env.JWT_SECRET,{expiresIn:'2h',  
        });

        res.json({token, user:{id:user.id, name:user.name, role:user.role}});
    }catch(err) {
        res.status(500).json({error:err.message});
    }
};

exports.getProfile = async (req, res)=>{
    try{
        const user = await User.findByPk(req.user.id,{attributes:{ exclude:['password']}});
        res.json(user);
    }catch(err){
        res.status(500).json({error:err.message});
    }
};