const { Router } = require(`express`)
const router = Router()
const sec = require('../security/securityCom')

const com = require('../controllers/comment.controller')




router.route('/')
	.get(sec.verifyBoth,com.getAll)
	.post(sec.verifyCreate,com.create)

router.route('/:id')
	.get(sec.verifyBoth,com.findOne)
	.post(com.like)
	.delete(sec.verifyDelete,com.delete)

module.exports=router