const { Model,DataTypes } = require('sequelize')
const sequelize = require('../db.js')
class Pedidos extends Model{}
const Users = require('./users.models')

Pedidos.init({
	id:{type:DataTypes.INTEGER,primaryKey:true,autoIncrement:true},
	Adress:{type:DataTypes.STRING,allowNull:false,validate:{notEmpty:true}},
 	Done:{type:DataTypes.BOOLEAN,allowNull:false,defaultValue:false},

 	ProductId:{type:DataTypes.STRING,allowNull:false,validate:{notEmpty:true}}

 	
 	
 	
},{
	sequelize,
	modelName:'Pedidos'
})




module.exports=Pedidos