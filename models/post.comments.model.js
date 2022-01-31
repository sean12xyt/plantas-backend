const Sss = require('sequelize')
const sequelize = require('../db.js')
class Comment extends Sss.Model{}


Comment.init({
	id:{type:Sss.DataTypes.INTEGER,primaryKey:true,autoIncrement:true},
 	Own:{type:Sss.DataTypes.STRING,allowNull:false,validate:{notEmpty:true},defaultValue:'Admin'},
 	Body:{type:Sss.DataTypes.STRING,allowNull:false,validate:{notEmpty:true}},
 	Multimedia:{type:Sss.DataTypes.STRING,allowNull:true},
 	LikedUsers:{type:Sss.DataTypes.STRING,allowNull:false,defaultValue:''},
 	NotLikedUsers:{type:Sss.DataTypes.STRING,allowNull:false,defaultValue:''},
 	PostId:{type:Sss.DataTypes.INTEGER,allowNull:false,validate:{notEmpty:true}}
},{
	sequelize,
	modelName:'Comment'
})




module.exports=Comment