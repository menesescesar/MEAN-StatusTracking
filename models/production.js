const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ProductionSchema = new Schema({
	productSerial: {
		type: String,
		required: true,
		unique: true
	},
	line:{
		type: Schema.Types.ObjectId,
		ref: 'lines',
		required:true
	},
	machine:{
		type: Schema.Types.ObjectId,
		ref: 'machines',
		required:true
	},
	product:{
		type: Schema.Types.ObjectId,
		ref: 'products',
		required:true
	},
	status: {
		type: String,
		default: null
	},
	finished: {
		type: Boolean,
		required: true
	},
});

const Production = mongoose.model('productions',ProductionSchema);

module.exports = Production;