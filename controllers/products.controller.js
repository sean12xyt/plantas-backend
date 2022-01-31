const products = {}
const ProductsModel = require('../models/products.model')

//Sean2021.,.">">{}><P{KJ{HO:BIYVFY twitch

products.getProducts=async(req,res)=>{
	let prods = await ProductsModel.findAll({where:req.query})
	res.send(prods)
}

products.createProduct=async(req,res)=>{
	let d = req.body
	if(!d.Name || !d.Section || !d.Price || !d.Description){
		return res.status(200).json({
			"message":"Verify your request dude!"
		})
	}

	ProductsModel.create(d).then(()=>{
		return res.send('product created')
	}).catch(e=>{
		return res.status(400).send('Error ocurred')
	})
}

products.getProductsById=async(req,res)=>{
	let req_id = req.params.id
	const prod = await ProductsModel.findOne({ where: {id:req_id} })
	return res.send(prod)
}
products.updateProducts=async(req,res)=>{
	let req_id = req.params.id
	

	ProductsModel.update(req.body,{ where:req.params })
		.then(result=>res.send('Product updated'))
		.catch(e=>res.send(e))

}
products.deleteProduct=async(req,res)=>{
	let req_id = req.params.id
	await ProductsModel.destroy({ where: {id:req_id} })
	return res.send('product deleted')
}




module.exports=products