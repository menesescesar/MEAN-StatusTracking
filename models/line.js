const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const LineSchema = new Schema({
	name: {
		type: String,
		required: true
	},
	description: {
		type: String,
		required: false
	}
});

const Line = mongoose.model('lines', LineSchema);

module.exports = Line;