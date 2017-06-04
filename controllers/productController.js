const Product = require('../models/product');

module.exports = {

	index(req, res, next){
		Product.find({}, (err,products) => res.status(200).send(products))
		.catch(next);
	},

	show(req, res, next){
		const productId = req.params.id;
		Product.findById({ _id:productId })
		.then(product => res.status(200).send(product))
		.catch(next);
	},

	store(req, res, next){
		const productProps = req.body;
		delete productProps._id;
		Product.create(productProps)
		.then(product => res.status(201).send(product))
		.catch(next);
	},

	update(req, res, next){
		const productId = req.params.id;
		const productProps = req.body;
		delete productProps._id;
		Product.findByIdAndUpdate({ _id:productId },productProps)
		.then(product => res.status(201).send(product))
		.catch(next);
	},

	destroy(req, res, next){
		const productId = req.params.id;
		Product.findByIdAndRemove({ _id:productId })
		.then(product => res.status(204).send(product))
		.catch(next);
	}
};