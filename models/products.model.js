// const products_model={}

// products_model.products_table=(sequelize,Datatype)=>{
// 	const Products = sequelize.define('Products',{
// 		id:{type:Datatype.INTEGER,primaryKey:true,autoIncrement:true},
// 		Name:{type:Datatype.STRING,allowNull:false,validate:{notEmpty:true}},
// 		Price:{type:Datatype.INTEGER,allowNull:false,validate:{notEmpty:true}},
// 		Section:{type:Datatype.STRING,allowNull:false,validate:{notEmpty:true}}
// 	})
// 	return Products
// }
// products_model.pedidos_table=(sequelize,Datatype)=>{
// 	const Pedidos = sequelize.define('Pedidos',{
// 		id:{type:Datatype.INTEGER,primaryKey:true,autoIncrement:true},
// 		product_id:{type:Datatype.INTEGER,allowNull:false,validate:{notEmpty:true}},
// 		Done:{type:Datatype.BOOLEAN,allowNull:false,defaultValue:false},
// 		Date:{type:Datatype.DATE,allowNull:false,validate:{notEmpty:true}}

// 	})
//  Pedidos.associate = (models)=>{
//		Pedidos.belongsTo(models.Users)
//	}
// }


// module.exports=products_model


const { Model,DataTypes } = require('sequelize')
const sequelize = require('../db.js')
class Products extends Model{}


Products.init({
	id:{type:DataTypes.INTEGER,primaryKey:true,autoIncrement:true},
 	Name:{type:DataTypes.STRING,allowNull:false,validate:{notEmpty:true}},
 	Price:{type:DataTypes.INTEGER,allowNull:false,validate:{notEmpty:true}},
 	Section:{type:DataTypes.STRING,allowNull:false,validate:{notEmpty:true}},
 	Description:{type:DataTypes.STRING},
 	Avaible:{type:DataTypes.BOOLEAN,allowNull:false,defaultValue:true}
},{
	sequelize,
	modelName:'Products'
})

module.exports=Products



