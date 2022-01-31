const { Router } = require(`express`)
const router  = Router()
let { getPosts,createPost,getById,updatePost,deletes,like} = require('../controllers/post.controller')
const security = require('../security/securityPost')



router.route('/')
	.get(security.getAll,getPosts)
	.post(security.getAll,createPost)

router.route('/:id')
	.get(security.getAll,getById)
	.post(security.like,like)
	.put(security.verifyUp,updatePost)
	.delete(security.verifyUp,deletes)



module.exports=router