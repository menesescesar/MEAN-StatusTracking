const mongoose = require('mongoose');
const config = require('../config/index');

before( (done) => {
	mongoose.connect(config.getTestDbConnection());
	mongoose.connection
			.once('open',() => done())
			.on('error', err => {
				console.warn('Warning',err);
				done();
			});
});

beforeEach( (done) => {
	const {lines} = mongoose.connection.collections;

	lines.drop()
		.then(() => done())
		.catch(() => done());
});