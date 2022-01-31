const { Router } = require(`express`)
const router = Router()
const security = require('../security/securityPr')


const { getProducts,createProduct,getProductsById,updateProducts,deleteProduct,getProductsByName,getProductsBySection } = require('../controllers/products.controller')

router.route('/')
	.get(security.verifyBoth,getProducts)
	.post(security.verifyAdmin,createProduct)

	
router.route('/:id')
	.get(security.verifyBoth,getProductsById)
	.put(security.verifyAdmin,updateProducts)
	.delete(security.verifyAdmin,deleteProduct)




		



module.exports=router