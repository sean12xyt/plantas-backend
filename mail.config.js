// benitezsean34 nodemailer
let nodemailer = require('nodemailer')
let trans = nodemailer.createTransport({
	service:'gmail',
	auth:{
		user:'lazarodavidma@gmail.com',
		pass:'ldma19895'
	}
})
let opts = {
	from:"lazarodavidma@gmail.com",
	to:'benitezsean34@yahoo.com',
	subject:'Email de prueba con Node',
	html:`
	<h1>Hola Pitoso</h1><br/>
	<p>Probando imagen</p>
	<img src='https://i.blogs.es/4f0662/consejos-foto-movil-01/1366_2000.jpg'/>
	`
}
trans.sendMail(opts,(err,inf)=>{
	if(err){
		console.log(err)
	}
	else console.log(inf)
})