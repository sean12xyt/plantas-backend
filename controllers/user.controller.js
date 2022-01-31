const users = {}
const UsersModel = require('../models/users.models')
const PedidosModel = require('../models/pedidos.model')


function isValidEmail(email) {
	const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
	return re.test(String(email).toLowerCase());
}




const confs= require('../encript')
const jwt = require('jsonwebtoken')
const config  = require('../config.js')

users.getUsers=async(req,res)=>{
	let users = await UsersModel.findAll({where:req.query})
	res.send(users)
}

users.createUsers=async(req,res)=>{
		let d = req.body
		d.Password = await confs.encript(d.Password)
		
		
			try {
				await UsersModel.create(d)
			}

			catch(e) {
				console.log(e)
				return res.status(403).send('could not create the user')	

			}
			
	
			return res.json({ auth: true, message: "user created" })
			

		
	
	


	
	
}



users.getUserById=async(req,res)=>{
	let req_id = req.params.id
	let user = await UsersModel.findOne({ where: {id:req_id} })
	if(user == null){
		return res.json({
			"message":"No user with id found"
		})
	}
	else return res.send(user)
}
users.updateUser=async(req,res)=>{
	if(req.body.Nick || req.body.Name){
		return res.status(400).json({
			"message":"You can not change the Name or Nick sorry!"
		})
	}
	let real = {	
	}
	req.body.Password ? real.Password = req.body.Password : null
	req.body.Email ? real.Email = req.body.Email : null
	req.body.Phone ? real.Phone = req.body.Phone : null
	await UsersModel.update(real,{ where:req.params })
		.then(result=>{
			if(result == 1){
				return res.status(200).json({
					"message":"User updated"
				})
			}
			else{
				return res.status(404).json({
					"message":"Cannot find user or bad request"
				})
			}
		})
		.catch(e=>res.send(e))

	
}
users.deleteUser=async(req,res)=>{
		let req_id = req.params.id
		let val = await UsersModel.findAll({where:{id:req_id}})
		if(val.length == 0){
			return res.status(404).json({
				"message":"No user with id found"
			})
		}
		try{
			await UsersModel.destroy({ where: {id:req_id} })
		}
		catch (e){
			return res.status(400).json({
				"message":"Operation not completed"
			})
		}
		

}


users.getInfo=async(req,res)=>{


	
	let sendUser = []
		
		if(req.ad){
			let user = await UsersModel.findOne({where:{id:req.ad}}).catch(e=>{
			console.log(e)
			return res.status(200).json({
				"message":"No user found"
				})
			})
			sendUser[0] = user
		


			let peds = await PedidosModel.findAll({where:{userId:req.ad}})


			return res.json({message:'token provided',user:sendUser,Pedidos:peds})
		}
			
		
		
		else{
			let user = await UsersModel.findOne({where:{id:req.decoded}}).catch(async(e)=>{
			console.log(e)
			return res.status(200).json({
				"message":"No user found"
			})})
			sendUser[0] = user
			let peds = await PedidosModel.findAll({ where:{userId:req.decoded}})

			return res.status(200).json({message:'token provided',user:sendUser,Pedidos:peds})
			
		}

			
	
		
	

}
users.validateInfo=async(req,res)=>{
	let validation
	if(req.body.Nick && req.body.Password){
		let user = await UsersModel.findOne({where:{Nick:req.body.Nick}})
		if(user==null){
			return res.json({mess:'No user found'}).status(404)
		}
		try{
			console.log(user.Password,'-----',req.body.Password)
			validation = await confs.validate(req.body.Password,user.Password)
		}
		catch(e){
			return res.status(400).json({
				"message":"Password malformed"
			})
		}

		if(validation){
			let token = jwt.sign({id:user.id},config.secret)
			res.status(200).json({
				auth:true,
				token:token
			})
		}
		else{
			return res.json({auth:false,message:'Incorrect Password'})
		}

	}
	else{
		return res.status(405).json({
			"message":"Verify your request"
		})
	}
	
	

}



module.exports=users