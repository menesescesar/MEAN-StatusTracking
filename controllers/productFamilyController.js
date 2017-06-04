const ProductFamily = require('../models/productFamily');

module.exports = {

	index(req, res, next){
		ProductFamily.find({}, (err,productFamilies) => res.status(200).send(productFamilies))
		.catch(next);
	},

	show(req, res, next){
		const productFamilyId = req.params.id;
		ProductFamily.findById({ _id:productFamilyId })
		.then(productFamily => res.status(200).send(productFamily))
		.catch(next);
	},

	store(req, res, next){
		const productFamilyProps = req.body;
		delete productFamilyProps._id;
		ProductFamily.create(productFamilyProps)
		.then(productFamily => res.status(201).send(productFamily))
		.catch(next);
	},

	update(req, res, next){
		const productFamilyId = req.params.id;
		const productFamilyProps = req.body;
		delete productFamilyProps._id;
		ProductFamily.findByIdAndUpdate({ _id:productFamilyId },productFamilyProps)
		.then(productFamily => res.status(201).send(productFamily))
		.catch(next);
	},

	destroy(req, res, next){
		const productFamilyId = req.params.id;
		ProductFamily.findByIdAndRemove({ _id:productFamilyId })
		.then(productFamily => res.status(204).send(productFamily))
		.catch(next);
	}
};