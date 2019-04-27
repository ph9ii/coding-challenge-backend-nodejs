// @ts-check

const express = require('express');

const errorHandler = require('../src/middleware/errorHandler');

const officers = require('../src/routes/officers');

module.exports = function(app) {
	app.use(errorHandler);

	app.get('/', (req, res, next) => {
		res.render('index', {
			title: 'Stolen Bike',
			message: 'Welcome Onboard'
		});
	});

	// Officers Router
	app.use('/api/officers', officers);
}
