const security = {}
const PostModel = require('../models/post.model')
const CommModel  = require('../models/post.comments.model')
const jwt = require('jsonwebtoken')
const config  = require('../config.js')



security.getAll = async(req,res,next)=>{
	if(!req.headers['admintoken'] || req.headers['admintoken'] !== 'lampuso3000'){
		let token = req.headers['x-access-token']
		let own_apps = req.headers['own-apps']
		if(!token || !own_apps || own_apps !== 'pass_granted'){
			return res.status(401).json({
				"M":"No token provided or origin not alowed"
			})
		}
		try{
			let decoded = await jwt.verify(token,config.secret)
			req.body.UserId = decoded.id
			next()
		}
		catch(e){
			console.log(e)
			return res.status(400).json({
				"message":"Token malformed"
			})
		}
	} 
	else next()
}

security.verifyUp  = async(req,res,next)=>{
	if(!req.headers['admintoken'] || req.headers['admintoken'] !== 'lampuso3000'){
		let token = req.headers['x-access-token']
		let own_apps = req.headers['own-apps']
		if(!token || !own_apps || own_apps !== 'pass_granted'){
			return res.status(401).json({
				"M":"No token provided or origin not alowed"
			})
		}
		try{
			let decoded = await jwt.verify(token,config.secret)
			let Post = await PostModel.findOne({where:{id:req.params.id}})

			if(parseInt(Post.UserId) !== decoded.id){
				return res.status(401).json({
					"message":"You have no access to this op"
				})
			}
			next()
		}
		catch(e){
			console.log(e)
			return res.status(400).json({
				"message":"Token malformed"
			})
		}
	} 
	else next()
}

security.like = async(req,res,next)=>{
	
		let token = req.headers['x-access-token']
		let own_apps = req.headers['own-apps']
		if(!token || !own_apps || own_apps !== 'pass_granted'){
			return res.status(401).json({
				"M":"No token provided or origin not alowed"
			})
		}
		try{
			let decoded = await jwt.verify(token,config.secret)
			req.UserId = decoded.id
			next()
		}
		catch(e){
			console.log(e)
			return res.status(400).json({
				"message":"Token malformed"
			})
		
	} 
	
}

module.exports=security