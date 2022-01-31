const postC = {}
const PostModel = require('../models/post.model')
const CommModel  = require('../models/post.comments.model')
const UsersModel = require('../models/users.models')

postC.getPosts = async(req,res)=>{

	try{
		let res2 = await PostModel.findAll({where:req.query})
		if(res2.length == 0){
			return res.status(404).json({
				"message":"Could not found any"
			})
		}
		return res.send(res2)
	}
	catch(e){
		console.log(e)
		return res.status(400).json({
			"message":"Verify your request or internal error ocurred"
		})
	}
	
}



postC.createPost = async(req,res)=>{
	let d = req.body
	if(!d.Title || !d.Body){
		return res.status(400).json({
			"message":"Verify your request"
		})
	}

	await PostModel.create(d).then(async res2=>{
		let coms = await CommModel.findAll({where:{PostId:res2.id}})
		return res.status(200).json({
			"message":"Post Created",
			"Post":res2,
			"Comments":coms
		})
	}).catch(e=>{
		console.log(e)
		return res.status(400).json({
			"message":"Error ocurred"
		})
	})
}
postC.getById = async(req,res)=>{

	await PostModel.findOne({where:{id:req.params.id}}).then(async res2=>{
		let coms = await CommModel.findAll({where:{PostId:res2.id}})
		return res.status(200).json({
			"Post":res2,
			"Comments":coms
		})
	}).catch(e=>{
		return res.status(400).json({
			"message":"Error ocurred"
		})
	})
}

postC.updatePost = async(req,res)=>{
	let d = req.body
	if(!d.Title && !d.Body && !d.Multimedia){
		return res.status(400).json({
			"message":"Verify your request"
		})

	}
	await PostModel.update(d,{where:{id:req.params.id}}).then(async(res2)=>{
		let Post = await PostModel.findOne({where:{id:req.params.id}})
		let coms = await CommModel.findAll({where:{PostId:req.params.id}})
		console.log(res2)
		return res.status(200).json({
			"Post":Post,
			"Comments":coms
		})
	}).catch(e=>{
		return res.status(400).json({
			"message":"Error ocurred"
		})
	})
}

postC.deletes = async(req,res)=>{
	await PostModel.destroy({ where:{id:req.params.id} }).then(res2=>{
		return res.status(200).json({
			"message":"Post deleted"
		})
	}).catch(e=>{
		return res.status(400).json({
			"message":"Error ocurred"
		})
	})

}

postC.like = async(req,res)=>{
	let d = req.body
	if(!d.Question){
		return res.status(400).json({
			"message":"Verify your request"
		})
	}
	let ps = await PostModel.findOne({where:{id:req.params.id}})


	let arr = []




	if(d.Question == true){
		for(let x of ps.LikedUsers){
			if(x === ',') continue
			else arr.push(parseInt(x))
		}
		if(arr.length === 0){
			ps.LikedUsers += `${req.UserId}`
			let data = {
				"LikedUsers":ps.LikedUsers
			}
			await PostModel.update(data,{where:{id:req.params.id}}).then(async rs2=>{
				let rs3 = await PostModel.findOne({where:{id:req.params.id}})
				return res.send(rs3)
			})
		}

		else{
			if(arr.indexOf(req.UserId) == -1){
				arr.push(req.UserId)
			}
			else{
				arr.splice(arr.indexOf(req.UserId),1)
			}
			let data = {
				"LikedUsers":""
			}
			
			data.LikedUsers = arr.toString()
			await PostModel.update(data,{where:{id:req.params.id}}).then(async rs2=>{
				let rs3 = await PostModel.findOne({where:{id:req.params.id}})
				return res.send(rs3)
			})
		}
		

	}
	else if(d.Question == "false"){
		for(let x of ps.NotLikedUsers){
			if(x === ',') continue
			else arr.push(parseInt(x))
		}

		if(arr.length === 0){
			ps.NotLikedUsers += `${req.UserId}`
			let data = {
				"NotLikedUsers":ps.NotLikedUsers
			}
			await PostModel.update(data,{where:{id:req.params.id}}).then(async rs2=>{
				let rs3 = await PostModel.findOne({where:{id:req.params.id}})
				return res.send(rs3)
			})
		}

		else{
			if(arr.indexOf(req.UserId) == -1){
				arr.push(req.UserId)
			}
			else{
				arr.splice(arr.indexOf(req.UserId),1)
			}
			let data = {
				"NotLikedUsers":""
			}
			
			data.NotLikedUsers = arr.toString()
			await PostModel.update(data,{where:{id:req.params.id}}).then(async rs2=>{
				let rs3 = await PostModel.findOne({where:{id:req.params.id}})
				return res.send(rs3)
			})
		}
	}
	else{
		return res.status(400).json({
			"message":"Verify your request"
		})
	}
}



module.exports = postC