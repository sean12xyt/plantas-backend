const bcrypt = require('bcryptjs')

const confs = {}

confs.encript = async(pass)=>{
    let salt = await bcrypt.genSalt(10)
	return await bcrypt.hash(pass,salt)
}
confs.validate = async(pass1,pass2)=>{
    return bcrypt.compare(pass1,pass2)
}
module.exports=confs