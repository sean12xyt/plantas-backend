const com = {}
const PostModel = require('../models/post.model')
const CommModel  = require('../models/post.comments.model')

com.getAll = async(req,res)=>{
	
	try{
		let res2 = await CommModel.findAll({where:req.query})
		if(res2.length == 0){
			return res.status(404).json({
				"message":"Could not found any"
			})
		}
		return res.send(res2)
	}
	catch(e){
		console.log(e)
		return res.status(401).json({
			"message":"Verify your request or internal error ocurred"
		})
	}
}

com.create = async(req,res)=>{
	let d = req.body
	if(!d.Body || !d.PostId){
		return res.status(403).json({
			"message":"verify your request"
		})
	}
	await CommModel.create(d).then(async res2=>{
		let coms = await CommModel.findAll({where:{PostId:d.PostId}})
		return res.status(200).json({
			"message":"Comment Created",
			"Comments":coms
		})
	}).catch(e=>{
		console.log(e)
		return res.status(400).json({
			"message":"Error ocurred"
		})
	})
}

com.findOne = async(req,res)=>{
	let comment = await CommModel.findOne({ where: {id:req.params.id }})
	if(comment == null){
		return res.json({
			"message":"No comment with id found"
		})
	}
	else return res.send(comment)
}

com.delete = async(req,res)=>{
		let val = await CommModel.findAll({where:{id:req.params.id}})
		if(val.length == 0){
			return res.status(404).json({
				"message":"No Comments with id found"
			})
		}
		try{
			
			await CommModel.destroy({ where: {id:req.params.id} })
			return res.json({
				"message":"Comment deleted"
			})
		}
		catch (e){
			return res.status(400).json({
				"message":"Operation not completed"
			})
		}
}

com.like = async(req,res)=>{
	let d = req.body
	if(!d.Question){
		return res.status(400).json({
			"message":"Verify your request"
		})
	}
	let ps = await CommModel.findOne({where:{id:req.params.id}})
	
	if(d.Question == true){
		ps.LikesGood = parseInt(ps.LikesGood) + 1

		await CommModel.update(ps.dataValues,{where:{id:req.params.id}}).then(async rs2=>{
			let rs3 = await CommModel.findOne({where:{id:req.params.id}})
			return res.send(rs3)
		})

	}
	else if(d.Question == "false"){
		ps.LikesFalse = parseInt(ps.LikesFalse) + 1 
		await CommModel.update(ps.dataValues,{where:{id:req.params.id}}).then(async rs2=>{
			let rs3 = await CommModel.findOne({where:{id:req.params.id}})
			return res.send(rs3)
		})
	}
	else{
		return res.status(400).json({
			"message":"Verify your request"
		})
	}
}

module.exports=com