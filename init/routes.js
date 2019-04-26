const express = require('express');

const errorHandler = require('../src/middleware/errorHandler');

module.exports = function(app) {
	app.use(errorHandler);

	app.get('/', (req, res, next) => {
		res.render('index', {
			title: 'Stolen Bike',
			message: 'Welcome Onboard'
		});
	});
}