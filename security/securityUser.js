const security = {}
const UsersModel = require('../models/users.models')
const confs= require('../encript')

function isValidEmail(email) {
	const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
	return re.test(String(email).toLowerCase());
}


const jwt = require('jsonwebtoken')
const config  = require('../config.js')

security.verifyAdmin = (req,res,next)=>{
	const token = req.headers['admintoken']
	if(!token || token !== 'lampuso3000'){
		return res.status(401).json({
			"message":"You have no access to this endpoint"
		})
	}
	next()
}

security.verifyCreate = async(req,res,next)=>{
	let token = req.headers['own-apps']
	if(!token || token !== 'pass_granted'){
		return res.status(401).json({
			"message":"You have no access to register"
		})
	}
	let d = req.body
	if(!d.Name || !d.Password || !d.Nick || !d.Phone || !d.Email){
		return res.status(400).json({
			"message":"Verify your request"
		})
	}

	if(d.Password.length < 8){
		return res.status(403).json({
			"message":"Verify your Password"
		})
	}
	let val = await UsersModel.findAll({where:{Nick:req.body.Nick}})
	if(val.length !== 0 ){
		return res.send('User already logged')

	}
	let resV = isValidEmail(d.Email)

	if(resV == false){
		return res.send('Mail not valid')

	}
	if(d.Phone.length < 8 || d.Phone < 50000000 || d.Phone >= 60000000){
		return res.send('Phone not Cuban')
	}
	

	next()
}


security.verifyMe = async(req,res,next)=>{
	if(!req.headers['admintoken'] || req.headers['admintoken'] !== 'lampuso3000'){
		let token = req.headers['x-access-token']
		if(!token){
			return res.status(401).json({
				"M":"No token provided"
			})
		} 

		try{
			let decoded = await jwt.verify(token,config.secret)
			req.decoded = decoded.id
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
		let ifget = req.headers['ifget']
		if(!ifget){
			return res.status(400).json({
				"message":"Your user-id is missing"
			})
		}
		req.ad = parseInt(ifget)
		next()
	}
}

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
			if(decoded.id !== parseInt(req.params.id)){
				return res.status(401).json({
					"message":"No access to this op"
				})
			}
			let d = req.body
			if(!d.Name && !d.Password && !d.Nick && !d.Phone && !d.Email){
				return res.status(400).json({
					"message":"Verify your request"
				})
			}

			if(d.Password){
				if(d.Password.length < 8){
					return res.status(403).json({
						"message":"Verify your Password"
					})
				}
			}
			
			if(d.Email){
				let resV = isValidEmail(d.Email)

				if(resV == false){
					return res.send('Mail not valid')

				}
			}


			if(d.Phone){
				if(d.Phone.length < 8 || d.Phone < 50000000 || d.Phone >= 60000000){
					return res.send('Phone not Cuban')
				}
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
	
	else{
		
		next()
	}
}

module.exports = security