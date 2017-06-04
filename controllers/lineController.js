const Line = require('../models/line');
const Machine = require('../models/machine');

module.exports = {

	index(req, res, next){
		Line.find({}, (err,lines) => res.status(200).send(lines))
		.catch(next);
	},

	show(req, res, next){
		const lineId = req.params.id;
		Line.findById({ _id:lineId })
		.then(line => res.status(200).send(line))
		.catch(next);
	},

	store(req, res, next){
		const lineProps = req.body;
		delete lineProps._id; 
		Line.create(lineProps)
		.then(line => res.status(201).send(line))
		.catch(next);
	},

	update(req, res, next){
		const lineId = req.params.id;
		const lineProps = req.body;
		delete lineProps._id;
		Line.findByIdAndUpdate({ _id:lineId },lineProps)
		.then(line => res.status(201).send(line))
		.catch(next);
	},

	destroy(req, res, next){
		const lineId = req.params.id;
		Line.findByIdAndRemove({ _id:lineId })
		.then(line => res.status(204).send(line))
		.catch(next);
	},

	machines(req, res, next){
		const lineId = req.params.id;
		Machine.find({ line:lineId })
		.then(machines => res.status(200).send(machines))
		.catch(next);
	},
};