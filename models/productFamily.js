const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ProductFamilySchema = new Schema({
	name: {
		type: String,
		required: true
	},
	description: {
		type: String,
		required: false
	}
});

const ProductFamily = mongoose.model('product_families',ProductFamilySchema);

module.exports = ProductFamily;