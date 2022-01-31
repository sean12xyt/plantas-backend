// const users_model={}

// users_model.users_table=(sequelize,Datatype)=>{
// 	const Users = sequelize.define('Users',{
// 		id:{type:Datatype.INTEGER,primaryKey:true,autoIncrement:true},
// 		Name:{type:Datatype.STRING,allowNull:false,validate:{notEmpty:true}},
// 		Nick:{type:Datatype.STRING,allowNull:false,validate:{notEmpty:true},unique:true},
// 		Password:{type:Datatype.STRING,allowNull:false,validate:{notEmpty:true}},
// 		Email:{type:Datatype.STRING,allowNull:false,validate:{notEmpty:true},unique:true},
// 		Phone:{type:Datatype.INTEGER,allowNull:false,validate:{notEmpty:true},unique:true}
// 	})
// 	Users.associate = (models)=>{
// 		Users.hasMany(models.Pedidos)
// 	}
// 	return Users
// }

// module.exports=users_model

const Sss = require('sequelize')
const sequelize = require('../db.js')
class Users extends Sss.Model{}
const pedidos_Model = require('./pedidos.model')

Users.init({
	id:{type:Sss.DataTypes.INTEGER,primaryKey:true,autoIncrement:true},
 	Name:{type:Sss.DataTypes.STRING,allowNull:false,validate:{notEmpty:true}},
 	Nick:{type:Sss.DataTypes.STRING,allowNull:false,validate:{notEmpty:true}},
 	Password:{type:Sss.DataTypes.STRING,allowNull:false,validate:{notEmpty:true}},
 	Email:{type:Sss.DataTypes.STRING,allowNull:false,validate:{notEmpty:true}},
 	Phone:{type:Sss.DataTypes.INTEGER,allowNull:false,validate:{notEmpty:true}}
 	
},{
	sequelize,
	modelName:'Users'
})


Users.hasMany(pedidos_Model)
pedidos_Model.belongsTo(Users)

module.exports=Users