const config  = require('../config.js')
const jwt = require('jsonwebtoken')



const security = {}



security.verifyAdmin = (req,res,next)=>{
	const token = req.headers['admintoken']
	if(!token || token !== 'lampuso3000'){
		return res.status(401).json({
			"message":"You have no access to this endpoint"
		})
	}
	next()
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