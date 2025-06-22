const { DataTypes} = require('sequelize');
const sequelize = require('./index');

const User = sequelize.define('User',{
    name:{type: DataTypes.STRING, allowNull: false},
    email:{type:DataTypes.STRING, unique:true, allowNull:false},
    password:{type:DataTypes.STRING, allowNull:false},
    role:{type:DataTypes.ENUM('buyer','seller'),defaultValue:'buyer'}
});

module.exports = User;