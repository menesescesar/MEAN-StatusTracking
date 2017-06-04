const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const MachineTypeSchema = new Schema({
	name: {
		type: String,
		required: true
	},
	description: {
		type: String,
		required: false
	}
});

const MachineType = mongoose.model('machine_types',MachineTypeSchema);

module.exports = MachineType;