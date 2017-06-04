const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ProductSchema = new Schema({
	name: {
		type: String,
		required: true
	},
	productFamily:{
		type: Schema.Types.ObjectId,
		ref: 'product_families',
		required:true
	}
});

const Product = mongoose.model('products',ProductSchema);

module.exports = Product;