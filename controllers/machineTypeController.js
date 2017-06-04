const MachineType = require('../models/machineType');
const Machine = require('../models/machine');

module.exports = {

	index(req, res, next){
		MachineType.find({}, (err,machineTypes) => res.status(200).send(machineTypes))
		.catch(next);
	},

	show(req, res, next){
		const machineTypeId = req.params.id;
		MachineType.findById({ _id:machineTypeId })
		.then(machineType => res.status(200).send(machineType))
		.catch(next);
	},

	store(req, res, next){
		const machineTypeProps = req.body;
		delete machineTypeProps._id;
		MachineType.create(machineTypeProps)
		.then(machineType => res.status(201).send(machineType))
		.catch(next);
	},

	update(req, res, next){
		const machineTypeId = req.params.id;
		const machineTypeProps = req.body;
		delete machineTypeProps._id;
		MachineType.findByIdAndUpdate({ _id:machineTypeId },machineTypeProps)
		.then(machineType => res.status(201).send(machineType))
		.catch(next);
	},

	destroy(req, res, next){
		const machineTypeId = req.params.id;
		MachineType.findByIdAndRemove({ _id:machineTypeId })
		.then(machineType => res.status(204).send(machineType))
		.catch(next);
	},

	machines(req, res, next){
		const machineTypeId = req.params.id;
		Machine.find({ machineType:machineTypeId })
		.then(machines => res.status(200).send(machines))
		.catch(next);
	},
};