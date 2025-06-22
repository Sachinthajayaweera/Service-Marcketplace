const { DataTypes} = require ('sequelize');
const sequelize = require ('./index');
const User = require('./user');
const Service = require('./service');
const Order = require('./order');

const Review = sequelize.define('Reiview',{
    rating:{
        type:DataTypes.INTEGER,
        allowNull:false,
        validate:{min:1, max:5}
    },
    comment:{
        type:DataTypes.TEXT,
        allowNull:true
    }
});

User.hasMany(Review,{foreignKey:'userId'});
Review.belongsTo(User, {foreignKey:'userId'});

Service.hasMany(Review, {foreignKey:'serviceId'});
Review.belongsTo(Service, {foreignKey:'serviceId'});

Order.hasMany(Review, {foreignKey:'orderId'});
Review.belongsTo(Order, {foreignKey:'orderId'});

module.exports = Review;