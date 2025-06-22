const {DataTypes} = require('sequelize');
const sequelize = require('./index');
const User = require('./user');

const Service = sequelize.define('Service',{
    title: {type:DataTypes.STRING,allowNull:false },
    description: {type:DataTypes.TEXT, allowNull:false},
    price: {type:DataTypes.FLOAT, allowNull:false},
    category: {type:DataTypes.STRING, allowNull:false},
});

User.hasMany(Service, {foreignKey:'userId'});
Service.belongsTo(User, {foreignKey: 'userId'});

module.exports = Service;
