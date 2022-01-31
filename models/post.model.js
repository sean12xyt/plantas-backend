const Sss = require('sequelize')
const sequelize = require('../db.js')
class Post extends Sss.Model{}


Post.init({
	id:{type:Sss.DataTypes.INTEGER,primaryKey:true,autoIncrement:true},
 	Title:{type:Sss.DataTypes.STRING,allowNull:false,validate:{notEmpty:true}},
 	UserId:{type:Sss.DataTypes.STRING,allowNull:true,defaultValue:'Admin'},
 	Body:{type:Sss.DataTypes.STRING,allowNull:false,validate:{notEmpty:true}},
 	Multimedia:{type:Sss.DataTypes.STRING,allowNull:true},
 	LikedUsers:{type:Sss.DataTypes.STRING,allowNull:false,defaultValue:''},
 	NotLikedUsers:{type:Sss.DataTypes.STRING,allowNull:false,defaultValue:''}
},{
	sequelize,
	modelName:'Post'
})




module.exports=Post