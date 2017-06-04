const MachineController = require('../controllers/machineController');
const ProductController = require('../controllers/productController');
const MachineTypeController = require('../controllers/machineTypeController');
const ProductFamilyController = require('../controllers/productFamilyController');
const LineController = require('../controllers/lineController');
const ProductionController = require('../controllers/productionController');

module.exports = (app) => {

	app.get('/api/machines', MachineController.index);
	app.get('/api/machines/:id', MachineController.show);
	app.post('/api/machines', MachineController.store);
	app.put('/api/machines/:id', MachineController.update);
	app.delete('/api/machines/:id', MachineController.destroy);

	app.get('/api/machinetypes', MachineTypeController.index);
	app.get('/api/machinetypes/:id', MachineTypeController.show);
	app.post('/api/machinetypes', MachineTypeController.store);
	app.put('/api/machinetypes/:id', MachineTypeController.update);
	app.delete('/api/machinetypes/:id', MachineTypeController.destroy);

	app.get('/api/machinetypes/:id/machines', MachineTypeController.machines);

	app.get('/api/productfamilies', ProductFamilyController.index);
	app.get('/api/productfamilies/:id', ProductFamilyController.show);
	app.post('/api/productfamilies', ProductFamilyController.store);
	app.put('/api/productfamilies/:id', ProductFamilyController.update);
	app.delete('/api/productfamilies/:id', ProductFamilyController.destroy);

	app.get('/api/products', ProductController.index);
	app.get('/api/products/:id', ProductController.show);
	app.post('/api/products', ProductController.store);
	app.put('/api/products/:id', ProductController.update);
	app.delete('/api/products/:id', ProductController.destroy);

	app.get('/api/lines', LineController.index);
	app.get('/api/lines/:id', LineController.show);
	app.post('/api/lines', LineController.store);
	app.put('/api/lines/:id', LineController.update);
	app.delete('/api/lines/:id', LineController.destroy);

	app.get('/api/lines/:id/machines', LineController.machines);

	app.get('/api/productions', ProductionController.index);
	app.get('/api/productions/:id', ProductionController.show);
	app.post('/api/productions', ProductionController.store);
	app.put('/api/productions/:id', ProductionController.update);


};