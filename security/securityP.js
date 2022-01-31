const config  = require('../config.js')
const jwt = require('jsonwebtoken')

const PedidosModel = require('../models/pedidos.model')

const security = {}

security.verifyAdmin = (req,res,next)=>{
	const token = req.headers['admintoken']
	console.log(token)
	if(!token || token !== 'lampuso3000'){
		return res.status(401).json({
			"message":"Access not alowed"
		})
	}
	next()
}

security.verifyToken = async(req,res,next)=>{
	if(!req.headers['admintoken'] || req.headers['admintoken']!=='lampuso3000'){
		let token = req.headers['x-access-token']
	if(!token){
		return res.status(401).json({
			"M":"No token provided"
		})
	} 

	try{
		let decoded = await jwt.verify(token,config.secret)
		req.userId = decoded.id
		next()
	}
	catch(e){
		console.log(e)
		return res.status(400).json({
			"message":"Token malformed"
		})
	}
	}
	else{
		if(!req.body.Custom){
			return res.status(404).json({
				"message":"No pusistes un id de usuario"
			})
		}
		next()
	}
	
}

security.verifyComplexPedidos = async(req,res,next)=>{
	if(!req.headers['admintoken'] || req.headers['admintoken'] !== 'lampuso3000'){
			let token = req.headers['x-access-token']
		if(!token){
			return res.status(401).json({
				"M":"No token provided"
			})
		} 

		try{
			let decoded = await jwt.verify(token,config.secret)
			req.userId = decoded.id

		}
		catch(e){
			console.log(e)
			return res.status(400).json({
				"message":"Token malformed"
			})
		}
		try{
			let ped = await PedidosModel.findOne({where:{id:req.params.id}})
			let decoded = await jwt.verify(token,config.secret)
			console.log(decoded.id,ped)
			if(decoded.id !== ped.dataValues.UserId){
				return res.status(401).json({
					"message":"You have no access to delete this product"
				})
			}
			next()
		}
		catch(e){
			console.log(e)
			return res.status(400).json({
				"message":"Product not exists"
			})
		}
		}
		else{
			try{
				let ped = await PedidosModel.findOne({where:{id:req.params.id}})
				next()
			}
				
			catch(e){
				console.log(e)
				return res.status(400).json({
				"message":"Product not exists"
			})
		}
		}
}

module.exports = security 