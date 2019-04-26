// const rateLimiterRedisMiddleware = require('./src/middleware/rateLimiterRedis');
const express = require("express");
const helmet = require("helmet");
const path = require("path");
const bodyParser = require('body-parser');

module.exports = function(app) {
	app.use((req, res, next) => {
		res.setHeader("Access-Control-Allow-Origin", "*");

		res.setHeader(
			"Access-Control-Allow-Headers", 
			"Origin, X-Requested-With, Content-Type, Accept, Authorization"
		);

		res.setHeader("Access-Control-Allow-Methods", 
			"GET, POST, PATCH, PUT, DELETE, OPTIONS");	
		next();
	});

	app.use(function (req, res, next) {
	  res.setHeader('X-Powered-By', process.env.APP_NAME || '')
	  next()
	});

	app.set('view engine', 'pug');
	app.set('views', './views');

	// app.use(rateLimiterRedisMiddleware);
	app.use(bodyParser.json());
	app.use(bodyParser.urlencoded({ extended: false }));
	// app.use(express.json());
	// app.use(express.urlencoded({ extended: false }));
	app.use(express.static('public'));
	app.use(helmet());
}