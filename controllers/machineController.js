const Machine = require('../models/machine');

module.exports = {

	index(req, res, next){
		Machine.find({}, (err,machines) => res.status(200).send(machines))
		//.populate({path:'line'})
		//.populate({path:'machineType'})
		.catch(next);
	},

	show(req, res, next){
		const machineId = req.params.id;
		Machine.findById({ _id:machineId })
		.populate({path:'line'})
		.populate({path:'machineType'})
		.then(machine => res.status(200).send(machine))
		.catch(next);
	},

	store(req, res, next){
		const machineProps = req.body;
		delete machineProps._id;
		if(machineProps.previous && machineProps.previous!=null) 
		{
			//verify if previous exists
			Machine.findById({ _id:machineProps.previous })
			.then(previousMachine => {
				if(previousMachine)
				{
					//verify line ID
					if(previousMachine.line == machineProps.line)
					{
						//verify if other machine have this previous machine
						Machine.findOne({ previous:machineProps.previous })
						.then(OtherMachine => {	
							if(OtherMachine)
							{
								Machine.create(machineProps)
								.then(machine => {
									//update its previous
									OtherMachine.previous = machine._id;
									OtherMachine.save();	
									res.status(201).send(machine);
								})
								.catch(next);
							}
							else
							{
								Machine.create(machineProps)
								.then(machine => {
									res.status(201).send(machine);
								})
								.catch(next);
							}
						})
						.catch(next);
					}
					else
					{
						next(new Error("machines in different lines"));
					}
				}
				else
				{
					next(new Error("previous machine dont exists"));
				}
			})
			.catch(next);
		}
		else
		{
			Machine.create(machineProps)
			.then(machine => {
				//this will be the first machine on the line
				//verify the first machine and set it to second
				Machine.findOne({ previous:null , line:machine.line, _id: {$ne: machine._id} })
				.then(OtherMachine => {	
					if(OtherMachine)
					{
						OtherMachine.previous = machine._id;
						OtherMachine.save().then(m => 
							res.status(201).send(machine));
					}
					else
						res.status(201).send(machine)
				})
				.catch(next);	
				
			})
			.catch(next);
		}
	},

	update(req, res, next){
		const machineId = req.params.id;
		const machineProps = req.body;
		delete machineProps._id;
		if(machineProps.previous)
		{
			//verify if exists
			Machine.findById({ _id:machineProps.previous })
			.then(previousMachine => {
				if(previousMachine)
				{
					//verify line ID
					if(previousMachine.line == machineProps.line)
					{
						//verify if other machine have this previous machine
						Machine.findOne({ previous:machineProps.previous })
						.then(OtherMachine => {	
							if(OtherMachine)
							{
								Machine.findById({ _id:machineId })
								.then(machine => {
									//update its previous
									OtherMachine.previous = machine._id;
									OtherMachine.save();	

									//verify if this machine has reference
									Machine.findOne({ previous:machineId })
									.then(RefMachine => {
										if(RefMachine)
										{
											RefMachine.previous = machine.previous;
											RefMachine.save();
										}

										//finaly update machine
										Machine.findByIdAndUpdate({ _id:machineId },machineProps)
										.then(machine => {
											res.status(201).send(machine);
										})
										.catch(next);
									})
									.catch(next);
								})
								.catch(next);
							}
						})
						.catch(next);						
					}
					else
					{
						next(new Error("machines in different lines"));
					}
				}
				else
				{
					next(new Error("previous machine dont exists"));
				}
			})
			.catch(next);
		}
		else
		{
			machineProps.previous = null;
			Machine.findById({ _id:machineId })
			.then(machine =>{
				//this will be the first machine on the line
				//verify the first machine and set it to second
				Machine.findOne({ previous:null , line:machineProps.line, _id: {$ne: machine._id} })
				.then(OtherMachine => {	
					if(OtherMachine)
					{
						OtherMachine.previous = machine._id;
						OtherMachine.save(); 
					}

					//verify if this machine has reference
					Machine.findOne({ previous:machineId })
					.then(RefMachine => {
						if(RefMachine)
						{
							RefMachine.previous = machine.previous;
							RefMachine.save();
						}

						//finaly update machine
						Machine.findByIdAndUpdate({ _id:machineId },machineProps)
						.then(machine => {
							res.status(201).send(machine);
						})
						.catch(next);
					})
					.catch(next);
				})
				.catch(next);	
			})
			.catch(next);
		}
	},

	destroy(req, res, next){
		const machineId = req.params.id;
		Machine.findByIdAndRemove({ _id:machineId })
		.then(machine => {
			//find if some machine have this as previous
			Machine.findOne({ previous:machineId })
			.then(OtherMachine => {	
				if(OtherMachine)
				{
					OtherMachine.previous = (machine.previous) ? machine.previous : null;
					OtherMachine.save();
				}
				res.status(204).send(machine);
			})
			.catch(next);
		})
		.catch(next);
	}
};