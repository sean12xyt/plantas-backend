const pedidos = {}
const PedidosModel = require('../models/pedidos.model')
const config  = require('../config.js')
const jwt = require('jsonwebtoken')

const ProductsModel = require('../models/products.model')


//Cheked
pedidos.getPedidos=async(req,res)=>{

	



	let peds = await PedidosModel.findAll({where:req.query})

	if(peds.length == 0) {
		res.send('Could not found any')
	}
	else res.send(peds)
}

//Cheked
pedidos.createPedido=async(req,res)=>{
	



	if(!req.body.Adress || !req.body.ProductId){
		return res.status(403).json({
			"message":"Verify your request"
		})
	}

	let data = {
		"Adress":req.body.Adress,
		"ProductId":req.body.ProductId,
		"UserId":req.userId || req.body.Custom

	}

	for(let x of data.ProductId){
		let res2 = await ProductsModel.findOne({where:{id:x}})
		if(res2.dataValues.Avaible == true){
			res2.dataValues.Avaible = false
			await ProductsModel.update(res2.dataValues,{where:{id:x}})
		}
		else{
			return res.status(401).json({
				"message":"Producto no disponible"
			})
		}
	}
	data.ProductId = data.ProductId.toString()
		

	PedidosModel.create(data).then(()=>{
		res.send('Pedido created')

	})
}

//Cheked
pedidos.getPedidoById=async(req,res)=>{
	let peds = await PedidosModel.findOne({ where:{id:req.params.id} })
	res.send(peds)
}


//Cheked
pedidos.deletePedidos=async(req,res)=>{
	await PedidosModel.destroy({ where:{id:req.params.id} })
	res.send('Pedido deleted')
}


pedidos.updatePedidos=async(req,res)=>{
	PedidosModel.update(req.body,{ where:{id:req.params.id} }).then(_=>{
		return res.send('Pedido updated')
	}).catch(e=>{
		console.log(e)
		return res.json({
			"message":"Check your request"
		})
	})
}






module.exports=pedidos