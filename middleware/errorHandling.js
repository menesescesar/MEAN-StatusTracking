module.exports = (err, req, res, next) => {
	console.log(err);
	res.status(404).send({error: err.message });
};