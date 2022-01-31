const { Router } = require(`express`)
const router = Router()
const security = require('../security/securityUser')

const { getUsers,createUsers,getUserById,updateUser,deleteUser,getInfo,validateInfo } = require('../controllers/user.controller')
const { verifyAdmin } = require('../security/securityP')


router.route('/')
	.get(security.verifyAdmin,getUsers)
	.post(security.verifyCreate,createUsers)
	

	
router.route('/me')
	.get(security.verifyMe,getInfo)

router.route('/signIn')
	.post(validateInfo) // is validated anyways

router.route('/:id')
	.get(verifyAdmin,getUserById)
	.put(security.verifyBoth,updateUser)
	.delete(verifyAdmin,deleteUser)
	



module.exports=router