const { DataTypes } = require('sequelize');
const sequelize = require('./index');
const User = require('./user');
const service = require('./service');
const Service = require('./service');

const Order = sequelize.define('order',{
    status:{
        type: DataTypes.STRING,
        defaultValue: 'pending'
    },
});

User.hasMany(Order,{foreignKey:'userId'});
Order.belongsTo(User,{foreignKey:'userId'});

Service.hasMany(Order,{foreignKey:'serviceId'});
Order.belongsTo(Service, {foreignKey:'serviceId'});

module.exports = Order;

