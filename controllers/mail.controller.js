const mailC={}
let nodemailer = require('nodemailer')

mailC.sendMail=async(req,res)=>{


let trans = nodemailer.createTransport({
	service:'gmail',
	auth:{
		user:'lazarodavidma@gmail.com',
		pass:'ldma19895'
	}
})
let opts = {
	from:req.body.Mail,
	to:'benitezsean34@yahoo.com',
	subject:req.body.Subject,
	html:req.body.Body
}
trans.sendMail(opts,(err,inf)=>{
	if(err){
		console.log(err)
	}
	else console.log(inf)
})
}





module.exports = mailC