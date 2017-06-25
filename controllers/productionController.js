const Production = require('../models/production');
const Product = require('../models/product');
const Machine = require('../models/machine');

module.exports = {

	index(req, res, next){
		Production.find({}, (err,productions) => res.status(200).send(productions))
        .populate({path:'product'})
		.catch(next);
	},

	show(req, res, next){
		const productionId = req.params.id;
		Production.findById({ _id:productionId })
		.populate({path:'product'})
		.then(production => res.status(200).send(production))
		.catch(next);
	},

	store(req, res, next){
		const productionProps = req.body;
		delete productionProps._id;
		productionProps.status = null;
		productionProps.finished = false;
		//verify its the first machine on the line 
		Machine.findOne({ _id:productionProps.machine })
		.then(machine => {
			if( !machine || machine.previous == null)
			{
				Production.create(productionProps)
				.then(production => {
                    Production.findById({ _id:production._id })
                    .populate({path:'product'})
                    .then(production => res.status(200).send(production))
				})
				.catch(next);
			}
			else
			{
				next(new Error("this is not the first machine on the line."));
			}
		})
		.catch(next);
	},

	update(req, res, next){
		const productionId = req.params.id;
		const productionProps = req.body;
		delete productionProps._id;
		let filterProductionProps = {};
		filterProductionProps.status = productionProps.status;
		filterProductionProps.finished = productionProps.finished;

		Production.findOneAndUpdate({ _id:productionId, finished: false },filterProductionProps)
		.then(production => {
			//if status is OK we send it to next machine
			if(production && filterProductionProps.status === 'OK')
			{
				Machine.findOne({ previous:production.machine })
				.then(machine => {
					if(machine)
					{
						let newProductionProps = {};
						newProductionProps.line = production.line;
						newProductionProps.machine = machine._id;
						newProductionProps.product = production.product;
						newProductionProps.productSerial = production.productSerial;
						newProductionProps.finished = false;
						newProductionProps.status = null;

						Production.create(newProductionProps)
						.then(newProduction => {
                            Production.findById({ _id:newProduction._id })
                            .populate({path:'product'})
                            .then(production => res.status(200).send(production))
                    	})
						.catch(next);
					}
					else
					{
						//this is the last machine
						res.status(201).send(null);
					}
				});
			}
			else
			{
				//there was other status[SCRAP,REWORK]
				res.status(201).send(production);
			}
		})
		.catch(next);
	}
};