const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const MachineSchema = new Schema({
	name: {
		type: String,
		required: true
	},
	serialNumber: {
		type: String,
		required: true
	},
	previous:{
		type: String,
		required: false
	},
	line:{
		type: Schema.Types.ObjectId,
		ref: 'lines',
		required:true
	},
	machineType:{
		type: Schema.Types.ObjectId,
		ref: 'machine_types',
		required:true
	}
});

const Machine = mongoose.model('machines',MachineSchema);

module.exports = Machine;