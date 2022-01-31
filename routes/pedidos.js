const { Router } = require(`express`)
const router = Router()
const security = require('../security/securityP.js')



const { createPedido,getPedidos,getPedidoById,updatePedidos,deletePedidos,getPedidoByUserId } = require('../controllers/pedidos.controller')

router.route('/')
	.get(security.verifyAdmin,getPedidos)
	.post(security.verifyToken,createPedido)

router.route('/:id')
	.get(security.verifyAdmin,getPedidoById)
	.put(security.verifyComplexPedidos,updatePedidos)
	.delete(security.verifyComplexPedidos,deletePedidos)

// router.route('/custom/:id')
// 	.post(getPedidoByUserId)






		



module.exports=router