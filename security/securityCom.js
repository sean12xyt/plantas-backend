const security = {}
const UsersModel = require('../models/users.models')
const config  = require('../config.js')
const jwt = require('jsonwebtoken')
const CommModel  = require('../models/post.comments.model')

security.verifyBoth = async(req,res,next)=>{
	if(!req.headers['admintoken'] || req.headers['admintoken'] !== 'lampuso3000'){
		let token = req.headers['x-access-token']
		if(!token){
			return res.status(401).json({
				"M":"No token provided"
			})
		} 

		try{
			let decoded = await jwt.verify(token,config.secret)
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
		
		next()
	}
}

security.verifyCreate = async(req,res,next)=>{
	if(!req.headers['admintoken'] || req.headers['admintoken'] !== 'lampuso3000'){
		let token = req.headers['x-access-token']
		if(!token){
			return res.status(401).json({
				"M":"No token provided"
			})
		} 

		try{
			let decoded = await jwt.verify(token,config.secret)
			let us = await UsersModel.findOne({where:{id:decoded.id}})
			req.body.Own = us.Nick
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
		req.body.Own = "Admin"
		next()
	}
}

security.verifyDelete = async(req,res,next)=>{
	if(!req.headers['admintoken'] || req.headers['admintoken'] !== 'lampuso3000'){
		let token = req.headers['x-access-token']
		if(!token){
			return res.status(401).json({
				"M":"No token provided"
			})
		} 

		try{
			let decoded = await jwt.verify(token,config.secret)
			let us = await UsersModel.findOne({where:{id:decoded.id}})
			let com = await CommModel.findOne({where:{id:req.params.id}})
			console.log(com.Own,'-----',us.Nick)
			if(com.Own !== us.Nick){
				return res.status(401).json({
					"message":"Access not alowed"
				})
			}
			else next()
		}
		catch(e){
			console.log(e)
			return res.status(400).json({
				"message":"Token malformed or else F."
			})
		}
	}
	
	else{
		
		next()
	}
}

module.exports = security