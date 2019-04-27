const mongoose = require('mongoose');
const winston = require('winston');

module.exports = function() {
	// Remove deprecated warning, when using required
	mongoose.set('useCreateIndex', true);

	const db = process.env.MONGODB;

	mongoose.connect(db, { useNewUrlParser: true })
		.then(() => winston.info(`Connected to ${db}...`));
}